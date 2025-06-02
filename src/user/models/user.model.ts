import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Conversation } from '../../conversation/models/conversation.model';


@ObjectType()
export class User {

  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field(() => [Conversation], { nullable: true })
  conversations?: Conversation[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

}