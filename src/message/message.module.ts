import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { MessageProducer } from './queues/message.producer';
import { MessageConsumer } from './consumers/message.consumer';
import { MessageGateway } from './gateways/message.gateway';
import { UserModule } from '../user/user.module';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  imports: [
    UserModule,
    ConversationModule,
    BullModule.registerQueue({ name: 'message' }),
  ],
  providers: [
    MessageResolver,
    MessageService,
    MessageProducer,
    MessageConsumer,
    MessageGateway,
  ],
  exports: [MessageService],
})
export class MessageModule {}
