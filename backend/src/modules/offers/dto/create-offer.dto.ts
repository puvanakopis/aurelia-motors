import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountType } from '@prisma/client';

export class CreateOfferDto {
  @ApiProperty({ example: 'Spring Allocation Privilege' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'spring-allocation-privilege' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'Preferential lease terms and bespoke accessories.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: DiscountType, default: DiscountType.PERCENTAGE })
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @ApiProperty({ example: 5 })
  @IsNumber()
  discountValue: number;

  @ApiProperty({ example: '2026-03-01T00:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2026-06-30T00:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/...' })
  @IsOptional()
  @IsString()
  bannerUrl?: string;
}

export class UpdateOfferDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: DiscountType })
  @IsOptional()
  @IsEnum(DiscountType)
  discountType?: DiscountType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  discountValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bannerUrl?: string;
}
