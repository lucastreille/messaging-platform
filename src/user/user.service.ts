import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor() {}

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByIds(ids: string[]): User[] {
    return this.users.filter((user) => ids.includes(user.id));
  }

  createUser(createUserInput: CreateUserInput): User {
    const newUser: User = {
      id: uuidv4(),
      username: createUserInput.username,
      email: createUserInput.email,
      avatarUrl: createUserInput.avatarUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }
}
