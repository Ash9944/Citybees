import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingGateway } from './messaging.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Conversations } from 'src/entities/conversation.entity';
import { ConversationMembers } from 'src/entities/conversationMembers.entity';
import { Messages } from 'src/entities/messaging.entity';
import { MessagingController } from './messaging.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Conversations, ConversationMembers, Messages])],
  providers: [MessagingGateway, MessagingService],
  controllers: [MessagingController]
})
export class MessagingModule { }
