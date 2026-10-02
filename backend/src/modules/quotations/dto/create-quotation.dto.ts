import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FinancingPreference, QuotationStatus } from '@prisma/client';

export class CreateQuotationDto {
  @ApiProperty({ example: 'vehicle-uuid-1' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: 'Alexander Wright' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'alexander@domain.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+94 77 123 4567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    enum: FinancingPreference,
    default: FinancingPreference.FINANCE,
  })
  @IsOptional()
  @IsEnum(FinancingPreference)
  financingPreference?: FinancingPreference;

  @ApiPropertyOptional({ example: '2021 Audi A6, 35000km, mint condition' })
  @IsOptional()
  @IsString()
  tradeInDetails?: string;

  @ApiPropertyOptional({ example: 40000 })
  @IsOptional()
  @IsNumber()
  downPayment?: number;

  @ApiPropertyOptional({ example: 48 })
  @IsOptional()
  @IsInt()
  termMonths?: number;
}

export class UpdateQuotationDto {
  @ApiPropertyOptional({ enum: QuotationStatus })
  @IsOptional()
  @IsEnum(QuotationStatus)
  status?: QuotationStatus;

  @ApiPropertyOptional({ example: 125000 })
  @IsOptional()
  @IsNumber()
  finalPrice?: number;

  @ApiPropertyOptional({ example: 5000 })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({ example: 1500 })
  @IsOptional()
  @IsNumber()
  fees?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  validUntil?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
