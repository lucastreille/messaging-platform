import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';
import { createTestUser, createTestConversation } from './utils/factories';

const prisma = new PrismaClient();

describe('GraphQL - createMessage (e2e)', () => {
  let app: INestApplication;
  let sender;
  let receiver;
  let conversation;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    sender = await createTestUser();
    receiver = await createTestUser();
    conversation = await createTestConversation([sender.id, receiver.id]);
  });

  it('should create a message and return it', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createMessage(
              createMessageInput: {
                content: "Message de test",
                conversationId: "${conversation.id}"
              },
              senderId: "${sender.id}"
            ) {
              id
              content
              sender {
                username
              }
              conversation {
                id
              }
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.createMessage.content).toBe('Message de test');
    expect(response.body.data.createMessage.sender.username).toBe(
      sender.username,
    );
    expect(response.body.data.createMessage.conversation.id).toBe(
      conversation.id,
    );
  });

  afterEach(async () => {
    await prisma.message.deleteMany();
    await prisma.conversationParticipant.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
