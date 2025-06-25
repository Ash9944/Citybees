import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user.dto';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsDate, IsBoolean, IsOptional, ValidateNested, IsArray, IsDateString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsString()
    id: string;
}
