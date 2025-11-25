import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'no') {
    const packages = await this.prisma.package.findMany({
      where: { isActive: true },
      include: {
        translations: {
          where: { language },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return packages.map((pkg) => {
      const translation = pkg.translations[0];
      return {
        id: pkg.id,
        slug: pkg.slug,
        priceMonthly: pkg.priceMonthly,
        isFeatured: pkg.isFeatured,
        name: translation?.name || '',
        description: translation?.description || '',
        features: translation?.features ? JSON.parse(translation.features as string) : [],
      };
    });
  }

  async findBySlug(slug: string, language: string = 'no') {
    const pkg = await this.prisma.package.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language },
        },
      },
    });

    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    const translation = pkg.translations[0];
    return {
      id: pkg.id,
      slug: pkg.slug,
      priceMonthly: pkg.priceMonthly,
      isFeatured: pkg.isFeatured,
      name: translation?.name || '',
      description: translation?.description || '',
      features: translation?.features ? JSON.parse(translation.features as string) : [],
    };
  }
}
