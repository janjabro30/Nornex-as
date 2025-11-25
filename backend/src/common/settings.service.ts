import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'no') {
    const settings = await this.prisma.siteSetting.findMany();
    return settings.reduce(
      (acc, setting) => {
        acc[setting.key] = language === 'en' ? setting.valueEn : setting.valueNo;
        return acc;
      },
      {} as Record<string, string | null>,
    );
  }

  async findOne(key: string, language: string = 'no') {
    const setting = await this.prisma.siteSetting.findUnique({
      where: { key },
    });
    if (!setting) return null;
    return language === 'en' ? setting.valueEn : setting.valueNo;
  }

  async upsert(key: string, valueNo: string, valueEn: string, type: string = 'text') {
    return this.prisma.siteSetting.upsert({
      where: { key },
      update: { valueNo, valueEn, type },
      create: { key, valueNo, valueEn, type },
    });
  }
}
