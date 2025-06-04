import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

export async function createTestUser() {
  return prisma.user.create({
    data: {
      id: uuid(),
      username: `test-user-${Date.now()}`,
      email: `user${Date.now()}@example.com`,
    },
  });
}

export async function createTestConversation(userIds: string[]) {
  const conversation = await prisma.conversation.create({
    data: {
      id: uuid(),
      title: 'Test Conversation',
      lastActivity: new Date(),
    },
  });

  for (const userId of userIds) {
    await prisma.conversationParticipant.create({
      data: {
        userId,
        conversationId: conversation.id,
      },
    });
  }

  return conversation;
}
