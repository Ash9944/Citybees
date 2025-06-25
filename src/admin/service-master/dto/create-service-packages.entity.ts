import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServicePackageDto {
  @IsNotEmpty()
  @IsString()
  serviceLevel: string;

  @IsNotEmpty()
  @IsString()
  serviceCode: string;

  @IsArray()
  @IsString({ each: true })
  description: string[];

  @IsDateString()
  effectiveStartDate: string;

  @IsDateString()
  effectiveEndDate: string;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  resourceCount: number;

  @IsNumber()
  estimatedTimeInMins: number;

  @IsNotEmpty()
  @IsString()
  subAssetMapping: string;
}
