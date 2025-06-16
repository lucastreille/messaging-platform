import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';
import { Message } from './models/message.model';
import { MessageProducer } from './queues/message.producer';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  constructor(
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
    private readonly messageProducer: MessageProducer,
  ) {}

  findAll(): Message[] {
    return this.messages;
  }

  findOneById(id: string): Message | undefined {
    return this.messages.find((m) => m.id === id);
  }

  findByConversationId(conversationId: string): Message[] {
    return this.messages.filter((m) => m.conversation.id === conversationId);
  }

  async createMessage(
    createMessageInput: any,
    senderId: string,
  ): Promise<Message> {
    const rawConversation = await this.conversationService.findOneById(
      createMessageInput.conversationId,
    );
    if (!rawConversation) throw new Error('Conversation not found');

    const conversation = rawConversation;

    const sender = await this.userService.findOneById(senderId);
    if (!sender) throw new Error('Sender not found');

    if (!conversation.participants.some((p) => p.id === senderId)) {
      throw new Error('Sender is not a participant in this conversation');
    }

    await this.messageProducer.enqueueNewMessage({
      content: createMessageInput.content,
      conversationId: conversation.id,
      senderId: sender.id,
    });

    return {
      id: 'pending',
      content: createMessageInput.content,
      sender,
      conversation,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async saveFromQueue({
    content,
    conversationId,
    senderId,
  }: {
    content: string;
    conversationId: string;
    senderId: string;
  }): Promise<Message> {
    const conversation =
      await this.conversationService.findOneById(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    if (!conversation.participants.some((p) => p.id === senderId)) {
      throw new Error('Sender is not a participant in this conversation');
    }

    const sender = await this.userService.findOneById(senderId);
    if (!sender) throw new Error('Sender not found');

    const message: Message = {
      id: uuidv4(),
      content,
      sender,
      conversation,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.messages.push(message);
    return message;
  }
}
