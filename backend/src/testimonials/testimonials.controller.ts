import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean, description: 'Filter by featured status' })
  findAll(
    @Query('lang') lang: string = 'no',
    @Query('featured') featured?: boolean,
  ) {
    return this.testimonialsService.findAll(lang, featured);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured testimonials' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of testimonials to return' })
  getFeatured(
    @Query('lang') lang: string = 'no',
    @Query('limit') limit: number = 3,
  ) {
    return this.testimonialsService.getFeatured(lang, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findOne(@Param('id') id: string, @Query('lang') lang: string = 'no') {
    return this.testimonialsService.findOne(id, lang);
  }
}
