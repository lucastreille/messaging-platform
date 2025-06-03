import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Message } from './models/message.model';
import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(() => [Message])
  messages(): Message[] {
    return this.messageService.findAll();
  }

  @Query(() => Message, { nullable: true })
  message(@Args('id') id: string): Message | undefined {
    return this.messageService.findOneById(id);
  }

  @Query(() => [Message])
  conversationMessages(
    @Args('conversationId') conversationId: string,
  ): Message[] {
    return this.messageService.findByConversationId(conversationId);
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @Args('senderId', { type: () => ID }) senderId: string,
  ): Promise<Message> {
    return this.messageService.createMessage(createMessageInput, senderId);
  }
}
