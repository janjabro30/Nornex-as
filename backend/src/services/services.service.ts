import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ServiceCategory } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'no', category?: ServiceCategory) {
    const where: any = { isActive: true };
    if (category) {
      where.category = category;
    }

    const services = await this.prisma.service.findMany({
      where,
      include: {
        translations: {
          where: { language },
        },
      },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });

    return services.map((service) => {
      const translation = service.translations[0];
      return {
        id: service.id,
        slug: service.slug,
        category: service.category,
        icon: service.icon,
        imageUrl: service.imageUrl,
        title: translation?.title || '',
        description: translation?.description || '',
        features: translation?.features ? JSON.parse(translation.features as string) : [],
      };
    });
  }

  async findByCategory(category: ServiceCategory, language: string = 'no') {
    const services = await this.prisma.service.findMany({
      where: { category, isActive: true },
      include: {
        translations: {
          where: { language },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return services.map((service) => {
      const translation = service.translations[0];
      return {
        id: service.id,
        slug: service.slug,
        category: service.category,
        icon: service.icon,
        imageUrl: service.imageUrl,
        title: translation?.title || '',
        description: translation?.description || '',
        features: translation?.features ? JSON.parse(translation.features as string) : [],
      };
    });
  }

  async findBySlug(slug: string, language: string = 'no') {
    const service = await this.prisma.service.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language },
        },
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const translation = service.translations[0];
    return {
      id: service.id,
      slug: service.slug,
      category: service.category,
      icon: service.icon,
      imageUrl: service.imageUrl,
      title: translation?.title || '',
      description: translation?.description || '',
      features: translation?.features ? JSON.parse(translation.features as string) : [],
    };
  }

  async getCategories() {
    return [
      { key: ServiceCategory.MANAGED_IT, labelNo: 'Managed IT & Reparasjon', labelEn: 'Managed IT & Repair' },
      { key: ServiceCategory.PRODUCT_STUDIO, labelNo: 'Produktstudio', labelEn: 'Product Studio' },
      { key: ServiceCategory.SECURITY, labelNo: 'Sikkerhet & Compliance', labelEn: 'Security & Compliance' },
    ];
  }
}
