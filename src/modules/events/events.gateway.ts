import { Logger, Inject } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/shared/interfaces';

enum EventEnum {
  Messages = 'messages',
}

@WebSocketGateway({ origins: '*:*', transports: ['websocket', 'polling'] })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients: Map<string, any> = new Map();
  @WebSocketServer()
  private server: Server;
  private readonly logger = new Logger(EventsGateway.name);

  public constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}

  public async handleConnection(client: Socket): Promise<void> {
    try {
      const { handshake, id } = client;
      //prettier-ignore
      const payload: IUser = await this.jwtService.verify('' + handshake.query.token);

      payload.sub && this.clients.set(payload.sub, client);
      this.logger.log(`Client connected => ${id} ${payload.username}`);
    } catch (err) {
      client.emit('unauthorized', err);
      client.disconnect();
    }
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected => ${client.id}`);
    client.disconnect();
    this.clients.delete(client.id);
  }

  public sendAllUser<T>(data: T): void {
    this.server.emit(EventEnum.Messages, data);
  }

  @SubscribeMessage(EventEnum.Messages)
  handleEvent(@MessageBody() data: any): any {
    console.log(data);
    data.server = Date.now();
    data.reduce = data.server - data.client;
    this.server.emit('messages', data);
    return data;
  }
}
