import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userTypes } from "src/enums/user.enums";

export class CreateMessagingDto {
    @IsString()
    @IsNotEmpty()
    senderId: string;

    @IsString()
    @IsOptional()
    recieverId: string;

    @IsString()
    @IsNotEmpty()
    messageContent: string

    @IsBoolean()
    isAdminMessage: boolean;
}
