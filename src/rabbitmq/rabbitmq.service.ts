import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private connection;
  private channel;

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('user_events');
  }

  async publishEvent(user: any) {
    const msg = JSON.stringify(user);

    console.log('Emit RabbitMQ', msg);
    //    this.channel.sendToQueue('user_events', Buffer.from(msg));
  }
}
