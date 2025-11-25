import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  @ApiOperation({ summary: 'Get all published blog posts' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'tag', required: false, description: 'Filter by tag slug' })
  findAllPosts(
    @Query('lang') lang: string = 'no',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('tag') tag?: string,
  ) {
    return this.blogService.findAllPosts(lang, page, limit, tag);
  }

  @Get('posts/recent')
  @ApiOperation({ summary: 'Get recent blog posts' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of posts to return',
  })
  getRecentPosts(@Query('lang') lang: string = 'no', @Query('limit') limit: number = 3) {
    return this.blogService.getRecentPosts(lang, limit);
  }

  @Get('posts/:slug')
  @ApiOperation({ summary: 'Get blog post by slug' })
  @ApiParam({ name: 'slug', description: 'Blog post URL slug' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findBySlug(@Param('slug') slug: string, @Query('lang') lang: string = 'no') {
    return this.blogService.findBySlug(slug, lang);
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all blog tags' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findAllTags(@Query('lang') lang: string = 'no') {
    return this.blogService.findAllTags(lang);
  }
}
