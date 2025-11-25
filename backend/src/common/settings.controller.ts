import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all site settings' })
  @ApiQuery({ name: 'lang', required: false, enum: ['no', 'en'], description: 'Language code' })
  findAll(@Query('lang') lang: string = 'no') {
    return this.settingsService.findAll(lang);
  }
}
