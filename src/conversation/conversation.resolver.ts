import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Conversation } from './models/conversation.model';
import { ConversationService } from './conversation.service';
import { CreateConversationInput } from './dto/create-conversation.input';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => [Conversation])
  async conversations(): Promise<Conversation[]> {
    return this.conversationService.findAll();
  }

  @Query(() => Conversation, { nullable: true })
  async conversation(@Args('id') id: string): Promise<Conversation | null> {
    return this.conversationService.findOneById(id);
  }

  @Query(() => [Conversation])
  async userConversations(@Args('userId') userId: string): Promise<Conversation[]> {
    return this.conversationService.findByUserId(userId);
  }

  @Mutation(() => Conversation)
  async createConversation(
    @Args('createConversationInput') createConversationInput: CreateConversationInput,
  ): Promise<Conversation> {
    return this.conversationService.createConversation(createConversationInput);
  }
}
