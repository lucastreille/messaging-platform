import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: uuidv4(),
        username: createUserInput.username,
        email: createUserInput.email,
        avatarUrl: createUserInput.avatarUrl ?? null,
      },
    });
  }
}
