import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { InquiriesService } from './inquiries.service';
import {
  CreateInquiryDto,
  UpdateInquiryDto,
  UpdateStatusDto,
  AssignInquiryDto,
} from './dto/inquiry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole, InquiryStatus } from '@prisma/client';

@ApiTags('Inquiries')
@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new inquiry (public endpoint)' })
  create(@Body() createInquiryDto: CreateInquiryDto) {
    return this.inquiriesService.create(createInquiryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all inquiries (Admin/Editor only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: InquiryStatus })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: InquiryStatus,
  ) {
    return this.inquiriesService.findAll(page, limit, status);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get inquiry statistics (Admin/Editor only)' })
  getStats() {
    return this.inquiriesService.getStats();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get inquiry by ID (Admin/Editor only)' })
  findOne(@Param('id') id: string) {
    return this.inquiriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update inquiry (Admin/Editor only)' })
  update(@Param('id') id: string, @Body() updateInquiryDto: UpdateInquiryDto) {
    return this.inquiriesService.update(id, updateInquiryDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update inquiry status (Admin/Editor only)' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.inquiriesService.updateStatus(id, dto.status);
  }

  @Patch(':id/assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Assign inquiry to user (Admin only)' })
  assign(@Param('id') id: string, @Body() dto: AssignInquiryDto) {
    return this.inquiriesService.assign(id, dto.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete inquiry (Admin only)' })
  delete(@Param('id') id: string) {
    return this.inquiriesService.delete(id);
  }
}
