import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { InquiryType, InquiryStatus } from '@prisma/client';

export class CreateInquiryDto {
  @ApiPropertyOptional({ enum: InquiryType, default: InquiryType.GENERAL })
  @IsEnum(InquiryType)
  @IsOptional()
  type?: InquiryType = InquiryType.GENERAL;

  @ApiProperty({ example: 'Ola' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Nordmann' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'ola@example.no' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: '+47 123 45 678' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Bedrift AS' })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({ example: 'Forespørsel om Managed IT' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Vi er interessert i deres Managed IT-tjenester...' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({ example: 'managed-endpoints' })
  @IsString()
  @IsOptional()
  serviceSlug?: string;

  @ApiPropertyOptional({ example: 'it-care-plus' })
  @IsString()
  @IsOptional()
  packageSlug?: string;

  @ApiPropertyOptional({ example: 'no', default: 'no' })
  @IsString()
  @IsOptional()
  language?: string = 'no';
}

export class UpdateInquiryDto extends PartialType(CreateInquiryDto) {
  @ApiPropertyOptional({ enum: InquiryStatus })
  @IsEnum(InquiryStatus)
  @IsOptional()
  status?: InquiryStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateStatusDto {
  @ApiProperty({ enum: InquiryStatus })
  @IsEnum(InquiryStatus)
  status: InquiryStatus;
}

export class AssignInquiryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
