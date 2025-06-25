import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { adminRoles } from "src/enums/admin.enums";

export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(adminRoles, { each: true })
    @Type(() => String)
    rolesAssigned: adminRoles[];

    @IsString()
    countryCode: string;

    @IsString()
    phoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    designation: string;

    @IsString()
    department: string;

    @IsString()
    @IsNotEmpty()
    employeeId: string;
}
