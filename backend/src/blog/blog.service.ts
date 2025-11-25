import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { BlogPostStatus } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAllPosts(language: string = 'no', page: number = 1, limit: number = 10, tag?: string) {
    const skip = (page - 1) * limit;
    const where: any = {
      status: BlogPostStatus.PUBLISHED,
    };

    if (tag) {
      where.tags = {
        some: {
          tag: { slug: tag },
        },
      };
    }

    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        include: {
          translations: {
            where: { language },
          },
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      data: posts.map((post) => this.formatPost(post, language)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string, language: string = 'no') {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language },
        },
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post || post.status !== BlogPostStatus.PUBLISHED) {
      throw new NotFoundException('Blog post not found');
    }

    return this.formatPost(post, language);
  }

  async findAllTags(language: string = 'no') {
    const tags = await this.prisma.blogTag.findMany({
      orderBy: { slug: 'asc' },
    });

    return tags.map((tag) => ({
      id: tag.id,
      slug: tag.slug,
      name: language === 'en' ? tag.nameEn : tag.nameNo,
    }));
  }

  async getRecentPosts(language: string = 'no', limit: number = 3) {
    const posts = await this.prisma.blogPost.findMany({
      where: { status: BlogPostStatus.PUBLISHED },
      include: {
        translations: {
          where: { language },
        },
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });

    return posts.map((post) => this.formatPost(post, language));
  }

  private formatPost(post: any, language: string) {
    const translation = post.translations[0];
    return {
      id: post.id,
      slug: post.slug,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt,
      author: {
        id: post.author.id,
        name: `${post.author.firstName} ${post.author.lastName}`,
      },
      tags: post.tags.map((t: any) => ({
        id: t.tag.id,
        slug: t.tag.slug,
        name: language === 'en' ? t.tag.nameEn : t.tag.nameNo,
      })),
      title: translation?.title || '',
      excerpt: translation?.excerpt || '',
      content: translation?.content || '',
      metaTitle: translation?.metaTitle || '',
      metaDesc: translation?.metaDesc || '',
    };
  }
}
