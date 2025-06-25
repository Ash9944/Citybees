import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsDate, IsBoolean, IsOptional, ValidateNested, IsArray, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { createAddressDto } from './address.dto';
import { CreatePersonalDocumentsDto } from '../../common/dto/personalDocuments.dto';
import { CreateTenancyContractDto } from './createTenancyContract.dto';
import { CreateVatDto } from '../../common/dto/createVat.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsNumber()
  step: number;

  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createAddressDto)
  addresses?: createAddressDto[];

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePersonalDocumentsDto)
  documents?: CreatePersonalDocumentsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateTenancyContractDto)
  tenancyContract?: CreateTenancyContractDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateVatDto)
  vat?: CreateVatDto;
}
