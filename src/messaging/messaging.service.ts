import { Injectable } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import { userTypes } from '../enums/user.enums';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ServiceProvider } from 'src/entities/serviceProvider.entity';
import { Technicians } from 'src/entities/technicians.entity';
import { Conversations } from 'src/entities/conversation.entity';
import { ConversationMembers } from 'src/entities/conversationMembers.entity';
import { Messages } from 'src/entities/messaging.entity';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(ServiceProvider)
    private serviceProviderRepo: Repository<ServiceProvider>,

    @InjectRepository(Technicians)
    private technicianRepo: Repository<Technicians>,

    @InjectRepository(Conversations)
    private conversationRepo: Repository<Conversations>,

    @InjectRepository(ConversationMembers)
    private conversationMembersRepo: Repository<ConversationMembers>,

    @InjectRepository(Messages)
    private messagesRepo: Repository<Messages>,
  ) { }

  fetchServiceRequestorConversation(conversationId: string) {
    try {

    } catch (error) {

    }
  }

  async createMessage(messagingDetails: CreateMessagingDto) {
    try {
      var details = await this.fetchUserDetails(messagingDetails);
      if (!details?.senderDetails) {
        throw new Error("Coudn't find sender details");
      }

      if (!details?.recieverDetails) {
        throw new Error("Coudn't find reciever details");
      }

      const conversationId = [details.senderDetails.id, details.recieverDetails.id].sort().join('');
      let conversationObject = await this.conversationRepo.findOne({ where: { conversationId : conversationId } });

      if (!conversationObject) {
        const newConversationObject = this.conversationRepo.create({
          conversationId : conversationId,
        });

        newConversationObject.participants = this.setCreateConversationMembersObject(details, newConversationObject);
        conversationObject = await this.conversationRepo.save(newConversationObject);
      }

      const message = this.messagesRepo.create({
        content: messagingDetails.messageContent,
        senderId: messagingDetails.senderId,
        conversation: conversationObject,
      });

      await this.messagesRepo.save(message);
    } catch (error) {

    }
  }

  async fetchUserDetails(messagingDetails: CreateMessagingDto) {
    try {
      var senderDetails: User | ServiceProvider | Technicians | null = null;
      var recieverDetails: User | ServiceProvider | Technicians | null = null;

      switch (messagingDetails.senderRole) {
        case userTypes.SERVICE_REQUESTER:
          senderDetails = await this.usersRepository.findOne({
            where: { id: messagingDetails.senderId }
          });
          break;

        case userTypes.SERVICE_PROVIDER:
          senderDetails = await this.serviceProviderRepo.findOne({
            where: { id: messagingDetails.senderId }
          });
          break;

        case userTypes.TECHNICIAN:
          senderDetails = await this.technicianRepo.findOne({
            where: { id: messagingDetails.senderId }
          });
          break;
      }

      switch (messagingDetails.recieverRole) {
        case userTypes.SERVICE_REQUESTER:
          recieverDetails = await this.usersRepository.findOne({
            where: { id: messagingDetails.senderId }
          });
          break;

        case userTypes.SERVICE_PROVIDER:
          recieverDetails = await this.serviceProviderRepo.findOne({
            where: { id: messagingDetails.senderId }
          });
          break;

        case userTypes.TECHNICIAN:
          recieverDetails = await this.technicianRepo.findOne({
            where: { id: messagingDetails.senderId }
          });
          break;
      }

      return { senderDetails, recieverDetails };

    } catch (error) {

    }
  }

  setCreateConversationMembersObject(details, createConversation): ConversationMembers[] {
    try {
      var conversationMemberObject: ConversationMembers[] = [];
      for (let object in details) {
        var createConversationMemberObject = this.conversationMembersRepo.create({
          conversation: createConversation,
        })

        if (details[object] instanceof User) {
          createConversationMemberObject.user = details[object];
        }
        else if (details[object] instanceof ServiceProvider) {
          createConversationMemberObject.serviceProvider = details[object];
        }
        else if (details[object] instanceof Technicians) {
          createConversationMemberObject.technician = details[object];
        }

        conversationMemberObject.push(createConversationMemberObject)
      }

      return conversationMemberObject;

    } catch (error) {
      return [];
    }
  }

  create(createMessagingDto: CreateMessagingDto) {
    return 'This action adds a new messaging';
  }

  findAll() {
    return `This action returns all messaging`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messaging`;
  }

  update(id: number, updateMessagingDto: UpdateMessagingDto) {
    return `This action updates a #${id} messaging`;
  }

  remove(id: number) {
    return `This action removes a #${id} messaging`;
  }
}
