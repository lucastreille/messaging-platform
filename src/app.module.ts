import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { BullModule } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthController } from './health/health.controller';
import { HealthCheckModule } from './health-check/health-check.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
console.log(`Connexion Redis -> host: ${process.env.REDIS_HOST}, port: ${process.env.REDIS_PORT}`);

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),

    HealthCheckModule,
    UserModule,
    ConversationModule,
    MessageModule,
  ],

  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
