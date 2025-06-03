import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MessageProducer {
  constructor(@InjectQueue('message') private readonly messageQueue: Queue) {}

  async enqueueNewMessage(data: {
    content: string;
    senderId: string;
    conversationId: string;
  }) {
    await this.messageQueue.add('new-message', data, {
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: false,
    });

    console.log('Message envoyé dans la queue :', data);
  }
}
