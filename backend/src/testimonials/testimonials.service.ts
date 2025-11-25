import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'no', featured?: boolean) {
    const where: any = { isActive: true };

    if (featured !== undefined) {
      where.isFeatured = featured;
    }

    const testimonials = await this.prisma.testimonial.findMany({
      where,
      include: {
        translations: {
          where: { language },
        },
      },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
    });

    return testimonials.map((t) => {
      const translation = t.translations[0];
      return {
        id: t.id,
        authorName: t.authorName,
        authorRole: t.authorRole,
        company: t.company,
        avatarUrl: t.avatarUrl,
        rating: t.rating,
        isFeatured: t.isFeatured,
        content: translation?.content || '',
      };
    });
  }

  async findOne(id: string, language: string = 'no') {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
      include: {
        translations: {
          where: { language },
        },
      },
    });

    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }

    const translation = testimonial.translations[0];
    return {
      id: testimonial.id,
      authorName: testimonial.authorName,
      authorRole: testimonial.authorRole,
      company: testimonial.company,
      avatarUrl: testimonial.avatarUrl,
      rating: testimonial.rating,
      isFeatured: testimonial.isFeatured,
      content: translation?.content || '',
    };
  }

  async getFeatured(language: string = 'no', limit: number = 3) {
    const testimonials = await this.prisma.testimonial.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        translations: {
          where: { language },
        },
      },
      orderBy: { sortOrder: 'asc' },
      take: limit,
    });

    return testimonials.map((t) => {
      const translation = t.translations[0];
      return {
        id: t.id,
        authorName: t.authorName,
        authorRole: t.authorRole,
        company: t.company,
        avatarUrl: t.avatarUrl,
        rating: t.rating,
        content: translation?.content || '',
      };
    });
  }
}
