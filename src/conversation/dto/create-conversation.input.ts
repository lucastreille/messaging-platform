import { Field, InputType } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateConversationInput {

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  participantIds: string[];
  
}