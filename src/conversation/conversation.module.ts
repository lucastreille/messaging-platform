import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { UserModule } from '../user/user.module';


@Module({
  
  imports: [UserModule],
  providers: [ConversationResolver, ConversationService],
  exports: [ConversationService]

})
  

export class ConversationModule {}