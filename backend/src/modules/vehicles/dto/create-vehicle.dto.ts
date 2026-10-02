import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FuelType, Transmission, StockStatus } from '@prisma/client';

export class VehicleImageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;
}

export class VehicleSpecificationDto {
  @ApiProperty({ example: 'Performance' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Acceleration (0-100 km/h)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '3.8 seconds' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateVehicleDto {
  @ApiProperty({ example: 'brand-uuid-1' })
  @IsString()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({ example: 'category-uuid-1' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'Porsche 911 Carrera S' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '911 Carrera S' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiPropertyOptional({ example: 'Carrera S' })
  @IsOptional()
  @IsString()
  variant?: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  year: number;

  @ApiProperty({ example: 125000 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 120000 })
  @IsOptional()
  @IsNumber()
  discountPrice?: number;

  @ApiProperty({ example: 'Exemplary sports precision...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: FuelType, example: FuelType.PETROL })
  @IsEnum(FuelType)
  fuelType: FuelType;

  @ApiProperty({ enum: Transmission, example: Transmission.AUTOMATIC })
  @IsEnum(Transmission)
  transmission: Transmission;

  @ApiPropertyOptional({ example: '3.0L Twin-Turbo Flat-6' })
  @IsOptional()
  @IsString()
  engine?: string;

  @ApiPropertyOptional({ example: '3.0L' })
  @IsOptional()
  @IsString()
  engineCapacity?: string;

  @ApiPropertyOptional({ example: 443 })
  @IsOptional()
  @IsInt()
  horsepower?: number;

  @ApiPropertyOptional({ example: 530 })
  @IsOptional()
  @IsInt()
  torque?: number;

  @ApiProperty({ example: 4500 })
  @IsInt()
  mileage: number;

  @ApiProperty({ example: 'Guards Red' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiPropertyOptional({ default: 2 })
  @IsOptional()
  @IsInt()
  doors?: number;

  @ApiPropertyOptional({ default: 4 })
  @IsOptional()
  @IsInt()
  seats?: number;

  @ApiPropertyOptional({ enum: StockStatus, default: StockStatus.AVAILABLE })
  @IsOptional()
  @IsEnum(StockStatus)
  stockStatus?: StockStatus;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 'porsche-911-carrera-s-2024' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ type: [VehicleImageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleImageDto)
  images?: VehicleImageDto[];

  @ApiPropertyOptional({ type: [VehicleSpecificationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleSpecificationDto)
  specifications?: VehicleSpecificationDto[];
}
