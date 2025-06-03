import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { MessageGateway } from '../gateways/message.gateway';

@Processor('message')
@Injectable()
export class MessageConsumer {
  constructor(
    private readonly gateway: MessageGateway,
    private readonly messageService: MessageService,
  ) {}

  @Process('new-message')
  async handleNewMessage(job: Job) {
    const { content, conversationId, senderId } = job.data;

    const message = this.messageService.saveFromQueue({
      content,
      conversationId,
      senderId,
    });

    console.log('Message envoyé :', message);

    this.gateway.broadcastMessage(message);
  }
}
