import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class FindProviderDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => FindProviderDto)
    items: ItemDto[];

    @IsString()
    prefferedDate: string;

    @IsString()
    prefferedTimes: string[];
}

class ItemDto {
    @IsString()
    itemId: string;

    @IsString()
    quantity: string;

    @IsString()
    description: string;

    @IsString()
    attachments: string[];
}