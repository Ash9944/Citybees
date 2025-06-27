import { IsNotEmpty, IsString } from "class-validator";

export class FetchMessagesQueryDto {
    @IsString()
    @IsNotEmpty()
    senderId : string;

    @IsNotEmpty()
    @IsString()
    recieverId : string;

    @IsNotEmpty()
    @IsString()
    cursorTime : string;

    @IsNotEmpty()
    @IsString()
    lastMessageId : string
}