import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTenancyContractDto {
  @IsOptional()
  @IsString()
  contractNumber?: string;

  @IsOptional()
  @IsString()
  contractExpiryDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contractDocuments?: string[];

  @IsOptional()
  @IsString()
  userId?: string;
}
