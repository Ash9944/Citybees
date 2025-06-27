import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { FetchMessagesQueryDto } from './dto/fetchMessages.dto';

@Controller('messages')
export class MessagingController {
    constructor(private readonly messagingService: MessagingService) { }

    @UseGuards(AuthGuard)
    @Post('/paginated')
    fetchServiceRequestorConversation(queryDetails: FetchMessagesQueryDto) {
        return this.messagingService.fetchConversation(queryDetails);
    }

    // // @UseGuards(AuthGuard)
    // @Post()
    // sendMessage(@Body() messagingDetails: CreateMessagingDto) {
    //     return this.messagingService.createMessage(messagingDetails);
    // }

}
