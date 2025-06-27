import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import { userTypes } from '../enums/user.enums';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Conversations } from 'src/entities/conversation.entity';
import { ConversationMembers } from 'src/entities/conversationMembers.entity';
import { Messages } from 'src/entities/messaging.entity';
import { FetchMessagesQueryDto } from './dto/fetchMessages.dto';
import { MessagingGateway } from './messaging.gateway';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Socket } from 'socket.io';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Conversations)
    private conversationRepo: Repository<Conversations>,

    @InjectRepository(ConversationMembers)
    private conversationMembersRepo: Repository<ConversationMembers>,

    @InjectRepository(Messages)
    private messagesRepo: Repository<Messages>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async fetchConversation(queryDetails: FetchMessagesQueryDto) {
    try {
      const messages = await this.messagesRepo
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.conversation', 'conversation')
        .where('message.conversationId = :convId', { convId: [queryDetails.senderId, queryDetails.recieverId].sort().join('') })
        .andWhere(
          'message.createdAt < :cursorTime OR (message.createdAt = :cursorTime AND message.id < :cursorId)',
          {
            cursorTime: queryDetails.cursorTime,
            cursorId: queryDetails.lastMessageId,
          }
        )
        .orderBy('message.createdAt', 'DESC')
        .addOrderBy('message.id', 'DESC')
        .take(20)
        .getMany();

      return messages;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createMessage(messagingDetails: CreateMessagingDto) {
    try {
      const senderDetails = await this.usersRepository.findOne({ where: { id: messagingDetails.senderId } });

      let recieverDetails: User | null;
      if (!messagingDetails.recieverId && messagingDetails.isAdminMessage) {
        recieverDetails = await this.usersRepository.findOne({ where: { email: "citybees@admin.com" } }); //static may change to dynamic
      } else {
        recieverDetails = await this.usersRepository.findOne({ where: { id: messagingDetails.recieverId } });
      }


      if (!senderDetails) {
        throw new Error("Coudn't find sender details");
      }

      if (!recieverDetails) {
        throw new Error("Coudn't find reciever details");
      }

      const conversationId = [senderDetails.id, recieverDetails.id].sort().join('');
      let conversationObject = await this.conversationRepo.findOne({ where: { conversationId: conversationId } });

      if (!conversationObject) {
        const newConversationObject = this.conversationRepo.create({
          conversationId: conversationId,
          ticketSubject: messagingDetails.messageContent
        });

        conversationObject = await this.conversationRepo.save(newConversationObject);

        await this.conversationMembersRepo.save([
          {
            conversation: conversationObject,
            user: senderDetails
          },
          {
            conversation: conversationObject,
            user: recieverDetails
          }
        ]);
      }

      const message = this.messagesRepo.create({
        content: messagingDetails.messageContent,
        sender: senderDetails,
        conversation: conversationObject,
      });

      var savedMessage = await this.messagesRepo.save(message);
      conversationObject.lastMessage = savedMessage;

      this.conversationRepo.save(conversationObject);
      var reciptientId = await this.cacheManager.get(recieverDetails.id);

      return { savedMessage, reciptientId };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async handleClientConnection(client: Socket) {
    try {
      if (!client.handshake.auth.userId) {
        throw new Error("Coudn't find userID");
      }

      const userId = client.handshake.auth.userId as string;
      await this.cacheManager.set(userId, client.id);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async handleClientDisconnection(client: Socket) {
    try {
      const userId = client.handshake.auth.userId as string;
      if (!userId) {
        throw new Error("Coudn't find User Id");
      }

      await this.cacheManager.del(userId);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
