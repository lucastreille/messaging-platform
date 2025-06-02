import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { UserModule } from '../user/user.module';
import { ConversationModule } from '../conversation/conversation.module';


@Module({
  imports: [UserModule, ConversationModule],
  providers: [MessageResolver, MessageService],
  exports: [MessageService]
})


export class MessageModule {}