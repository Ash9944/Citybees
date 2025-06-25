import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSubcategoryDto } from './create-service-subCatgories.dto';

export class CreateServicesMasterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    heroImages?: string[];

    @IsArray()
    @IsString({ each: true })
    serviceCategoryIcons: string[];

    @IsDateString()
    effectiveStartDate: string;

    @IsDateString()
    effectiveEndDate: string;

    @IsBoolean()
    isActive: boolean;

    @IsBoolean()
    isGeneralInspectionAsOption: boolean;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateSubcategoryDto)
    subcategories?: CreateSubcategoryDto[];
}
