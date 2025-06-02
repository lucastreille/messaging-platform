import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Conversation } from './models/conversation.model';
import { ConversationService } from './conversation.service';
import { CreateConversationInput } from './dto/create-conversation.input';


@Resolver(() => Conversation)
export class ConversationResolver {

  constructor(private conversationService: ConversationService) {}


  @Query(() => [Conversation])
  conversations(): Conversation[] {
    return this.conversationService.findAll();
  }


  @Query(() => Conversation, { nullable: true })
  conversation(@Args('id') id: string): Conversation | undefined {
    return this.conversationService.findOneById(id);
  }


  @Query(() => [Conversation])
  userConversations(@Args('userId') userId: string): Conversation[] {
    return this.conversationService.findByUserId(userId);
  }


  @Mutation(() => Conversation)
  createConversation(
    @Args('createConversationInput') createConversationInput: CreateConversationInput
  ): Conversation {
    return this.conversationService.createConversation(createConversationInput);
  }
  

}