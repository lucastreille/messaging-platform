import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/models/user.model';
import { Conversation } from '../../conversation/models/conversation.model';

@ObjectType()
export class Message {

  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  sender: User;

  @Field(() => Conversation)
  conversation: Conversation;

  @Field(() => Boolean, { defaultValue: false })
  isRead: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

}