import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class createDocumentDto {
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  expiryDate: Date;

  @IsOptional()
  @IsString()
  tenancyContractNumber?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  tenancyContractExpiryDate?: Date;

  @IsOptional()
  @IsBoolean()
  isVatApplicable?: boolean;

  @IsOptional()
  @IsString()
  vatNumber?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  vatExpiryDate?: Date;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  identityVerificationDocuments: string[];

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tenancyContractDocuments: string[];

  @IsString({ each: true })
  @IsOptional()
  vatDocuments?: string[];
}
