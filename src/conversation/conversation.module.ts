import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  
  imports: [UserModule],
  providers: [ConversationResolver, ConversationService, PrismaService],
  exports: [ConversationService]

})
  

export class ConversationModule {}