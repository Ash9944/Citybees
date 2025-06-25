import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { userTypes } from "src/enums/user.enums";

export class CreateMessagingDto {
    @IsString()
    @IsNotEmpty()
    senderId: string;

    @IsEnum(userTypes)
    @IsNotEmpty()
    senderRole: userTypes;

    @IsString()
    @IsNotEmpty()
    recieverId: string;

    @IsEnum(userTypes)
    @IsNotEmpty()
    recieverRole: userTypes;

    @IsString()
    @IsNotEmpty()
    messageContent: string
}
