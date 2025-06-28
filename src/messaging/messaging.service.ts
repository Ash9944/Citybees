import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Conversations } from '../entities/conversation.entity';
import { ConversationMembers } from '../entities/conversationMembers.entity';
import { Messages } from '../entities/messaging.entity';
import { FetchMessagesQueryDto } from './dto/fetchMessages.dto';
import Redis from 'ioredis';
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

    @Inject('REDIS_CLIENT') private readonly cacheManager: Redis,
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

      const conversationId = [senderDetails.id, recieverDetails.id].sort().join('_');
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
      var reciptientDetails = await this.cacheManager.get(recieverDetails.id);

      return { savedMessage, recipientDetails: reciptientDetails ? JSON.parse(reciptientDetails) : null };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async handleClientConnection(client: Socket) {
    try {
      if (!client.handshake.auth.userId) {
        throw new Error("Coudn't find userId");
      }

      const userId = client.handshake.auth.userId as string;
      const cacheData = await this.cacheManager.get(userId);
      if (!cacheData) {
        throw new Error("User not registered");
      }

      const parsed = JSON.parse(cacheData);
      parsed.socketId = client.id;
      await this.cacheManager.set(userId, JSON.stringify(parsed));

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

      const cacheData = await this.cacheManager.get(userId);
      if (!cacheData) {
        throw new Error("User not registered");
      }

      const parsedData = JSON.parse(cacheData);
      delete parsedData.socketId;

      await this.cacheManager.set(userId, JSON.stringify(parsedData));
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
