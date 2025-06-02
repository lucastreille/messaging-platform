import { Injectable } from '@nestjs/common';
import { Conversation } from './models/conversation.model';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UserService } from '../user/user.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConversationService {

  private conversations: Conversation[] = [];

  constructor(private userService: UserService) {}


  findAll(): Conversation[] {
    return this.conversations;
  }


  findOneById(id: string): Conversation | undefined {
    return this.conversations.find(conversation => conversation.id === id);
  }


  findByUserId(userId: string): Conversation[] {
    return this.conversations.filter(conversation => 
      conversation.participants.some(participant => participant.id === userId)
    );
  }


  createConversation(createConversationInput: CreateConversationInput): Conversation {

    const participants = this.userService.findByIds(createConversationInput.participantIds);
    
    if (participants.length < createConversationInput.participantIds.length) {
      throw new Error('Some participants do not exist');
    }

    const newConversation: Conversation = {
      id: uuidv4(),
      title: createConversationInput.title || participants.map(p => p.username).join(', '),
      participants,
      lastActivity: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.conversations.push(newConversation);
    return newConversation;
    
  }


}