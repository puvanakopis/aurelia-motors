import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ example: 'Colombo Flagship Salon' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '42 Alfred House Gardens, Kollupitiya' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Colombo 03' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: '+94 11 258 9000' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'colombo@aureliamotors.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Mon - Sat: 9:00 AM - 7:00 PM' })
  @IsString()
  @IsNotEmpty()
  openingHours: string;

  @ApiPropertyOptional({ example: 6.8988 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 79.8567 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateBranchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  openingHours?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
