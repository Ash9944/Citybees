import { IsArray, IsBooleanString, IsOptional, IsString } from 'class-validator';

export class CreateVatDto {
  @IsOptional()
  @IsBooleanString()
  isVatApplicable?: boolean; 

  @IsOptional()
  @IsString()
  vatNumber?: string;

  @IsOptional()
  @IsString()
  licenseValidity?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vatDocuments?: string[];

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  providerBusinessId?: string;
}
