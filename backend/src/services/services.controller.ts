import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { ServiceCategory } from '@prisma/client';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all IT services' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  @ApiQuery({ name: 'category', required: false, enum: ServiceCategory, description: 'Filter by category' })
  findAll(
    @Query('lang') lang: string = 'no',
    @Query('category') category?: ServiceCategory,
  ) {
    return this.servicesService.findAll(lang, category);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get service categories' })
  getCategories() {
    return this.servicesService.getCategories();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get services by category' })
  @ApiParam({ name: 'category', enum: ServiceCategory })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findByCategory(
    @Param('category') category: ServiceCategory,
    @Query('lang') lang: string = 'no',
  ) {
    return this.servicesService.findByCategory(category, lang);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get service by slug' })
  @ApiParam({ name: 'slug', description: 'Service URL slug' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findBySlug(@Param('slug') slug: string, @Query('lang') lang: string = 'no') {
    return this.servicesService.findBySlug(slug, lang);
  }
}
