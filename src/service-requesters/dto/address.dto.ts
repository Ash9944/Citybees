import {IsDecimal, IsEnum, IsNotEmpty,IsString} from'class-validator';
import { serviceRequestorRole } from 'src/enums/user.enums';

export class createAddressDto {
  @IsDecimal()
  @IsNotEmpty()
  latitude: number;

  @IsDecimal()
  @IsNotEmpty()
  longtitude: number;

  @IsEnum(serviceRequestorRole)
  @IsNotEmpty()
  role: serviceRequestorRole;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  area: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  flatBuildingNumber: string;

  @IsString()
  userId : string;
}
