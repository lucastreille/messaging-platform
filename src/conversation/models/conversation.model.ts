import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Message } from '../../message/models/message.model';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => [User])
  participants: User[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field()
  lastActivity: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
