import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConversationInput } from './dto/create-conversation.input';
import { Conversation } from './models/conversation.model';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const conversations = await this.prisma.conversation.findMany({
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return conversations.map((conv) => ({
      ...conv,
      participants: conv.participants.map((p) => p.user),
    }));
  }

  async findOneById(id: string): Promise<Conversation | null> {
    const rawConversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!rawConversation) return null;

    return {
      ...rawConversation,
      participants: rawConversation.participants.map((p) => p.user),
    };
  }

  async findByUserId(userId: string) {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return conversations.map((conv) => ({
      ...conv,
      participants: conv.participants.map((p) => p.user),
    }));
  }

  async createConversation(input: CreateConversationInput) {
    const conversation = await this.prisma.conversation.create({
      data: {
        title: input.title,
        participants: {
          create: input.participantIds.map((id) => ({
            user: { connect: { id } },
          })),
        },
        lastActivity: new Date(),
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return {
      ...conversation,
      participants: conversation.participants.map((p) => p.user),
    };
  }
}
