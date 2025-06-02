import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateMessageInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  
  @Field()
  @IsUUID()
  conversationId: string;

}