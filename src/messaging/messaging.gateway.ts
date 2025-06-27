// chat.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { resolve } from 'path';

@WebSocketGateway({ cors: true })
export class MessagingGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagingService: MessagingService) { }

  // @SubscribeMessage('joinConversation')
  // handleJoinConversation(@MessageBody() conversationId: string, @ConnectedSocket() client: Socket) {
  //   client.join(conversationId);
  // }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: CreateMessagingDto) {
    const response = await this.messagingService.createMessage(data);
    
    const reciptientId = response.reciptientId as string;
    if (reciptientId) {
      this.server.to(reciptientId).emit('newMessage', response.savedMessage);
    }

    return true;
  }

  handleConnection(client: Socket) {
    return this.messagingService.handleClientConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.messagingService.handleClientDisconnection(client)
  }
}
