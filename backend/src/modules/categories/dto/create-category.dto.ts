import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'SUV' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'suv' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'Capability, refined' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '/images/categories/suv.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'SUV' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'suv' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
