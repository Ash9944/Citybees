import { IsString, IsNotEmpty, IsBoolean, IsOptional, ValidateNested, IsArray, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateServicePackageDto } from './create-service-packages.entity';

export class CreateSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  keyHighlights: string[];

  @IsDateString()
  effectiveStartDate: string;

  @IsDateString()
  effectiveEndDate: string;

  @IsNotEmpty()
  @IsString()
  serviceMasterId: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateServicePackageDto)
  servicePackages?: CreateServicePackageDto[];
}