import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingGateway } from './messaging.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ServiceProvider } from 'src/entities/serviceProvider.entity';
import { Technicians } from 'src/entities/technicians.entity';
import { Conversations } from 'src/entities/conversation.entity';
import { ConversationMembers } from 'src/entities/conversationMembers.entity';
import { Messages } from 'src/entities/messaging.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ServiceProvider, Technicians, Conversations, ConversationMembers, Messages])],
  providers: [MessagingGateway, MessagingService],
})
export class MessagingModule { }
