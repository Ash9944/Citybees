import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';

@WebSocketGateway()
export class MessagingGateway {
  constructor(private readonly messagingService: MessagingService) {}

  @SubscribeMessage('createMessaging')
  create(@MessageBody() createMessagingDto: CreateMessagingDto) {
    return this.messagingService.create(createMessagingDto);
  }

  @SubscribeMessage('findAllMessaging')
  findAll() {
    return this.messagingService.findAll();
  }

  @SubscribeMessage('findOneMessaging')
  findOne(@MessageBody() id: number) {
    return this.messagingService.findOne(id);
  }

  @SubscribeMessage('updateMessaging')
  update(@MessageBody() updateMessagingDto: UpdateMessagingDto) {
    return this.messagingService.update(updateMessagingDto.id, updateMessagingDto);
  }

  @SubscribeMessage('removeMessaging')
  remove(@MessageBody() id: number) {
    return this.messagingService.remove(id);
  }
}
