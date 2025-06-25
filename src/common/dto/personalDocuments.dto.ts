import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonalDocumentsDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  idNumber: string;

  @IsNotEmpty()
  @IsString()
  expiryDate: string;

  @IsArray()
  @IsString({ each: true })
  uploadedDocuments: string[];

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  serviceProviderId?: string;

  @IsOptional()
  @IsString()
  technicianId?: string;
}
