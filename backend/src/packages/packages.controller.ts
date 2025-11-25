import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { PackagesService } from './packages.service';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pricing packages' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findAll(@Query('lang') lang: string = 'no') {
    return this.packagesService.findAll(lang);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get package by slug' })
  @ApiParam({ name: 'slug', description: 'Package URL slug' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findBySlug(@Param('slug') slug: string, @Query('lang') lang: string = 'no') {
    return this.packagesService.findBySlug(slug, lang);
  }
}
