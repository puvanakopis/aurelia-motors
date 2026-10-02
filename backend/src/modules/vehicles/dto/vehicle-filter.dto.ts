import { IsOptional, IsString, IsEnum, IsNumber, IsBoolean, IsIn } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FuelType, Transmission, StockStatus } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class VehicleFilterDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search term across name, model, and description' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by brand ID or slug' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ description: 'Filter by category ID or slug' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: FuelType })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @ApiPropertyOptional({ enum: Transmission })
  @IsOptional()
  @IsEnum(Transmission)
  transmission?: Transmission;

  @ApiPropertyOptional({ enum: StockStatus })
  @IsOptional()
  @IsEnum(StockStatus)
  stockStatus?: StockStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({
    enum: ['price_asc', 'price_desc', 'year_desc', 'mileage_asc', 'newest'],
    default: 'newest',
  })
  @IsOptional()
  @IsIn(['price_asc', 'price_desc', 'year_desc', 'mileage_asc', 'newest'])
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc' | 'newest';
}
