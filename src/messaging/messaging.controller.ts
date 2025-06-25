import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';

@Controller('messages')
export class UserController {
    constructor(private readonly messagingService: MessagingService) { }

    @UseGuards(AuthGuard)
    @Get('/:conversationId')
    fetchServiceRequestorConversation(@Param() conversationId: string) {
        return this.messagingService.fetchServiceRequestorConversation(conversationId);
    }

    @UseGuards(AuthGuard)
    @Post("/create")
    sendMessage(@Body() messagingDetails: CreateMessagingDto) {
        return this.messagingService.createMessage(messagingDetails);
    }

}
