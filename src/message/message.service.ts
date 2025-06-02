import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Message } from './models/message.model';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';


@Injectable()
export class MessageService {


  private messages: Message[] = [];


  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
  ) {}


  findAll(): Message[] {
    return this.messages;
  }


  findOneById(id: string): Message | undefined {
    return this.messages.find(message => message.id === id);
  }


  findByConversationId(conversationId: string): Message[] {
    return this.messages.filter(message => message.conversation.id === conversationId);
  }


  createMessage(createMessageInput: any, senderId: string): Message {
    
    const conversation = this.conversationService.findOneById(createMessageInput.conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const sender = this.userService.findOneById(senderId);
    if (!sender) {
      throw new Error('Sender not found');
    }

    if (!conversation.participants.some(p => p.id === senderId)) {
      throw new Error('Sender is not a participant in this conversation');
    }

    const newMessage: Message = {
      id: uuidv4(),
      content: createMessageInput.content,
      sender,
      conversation,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.messages.push(newMessage);
    
    return newMessage;

  }


}