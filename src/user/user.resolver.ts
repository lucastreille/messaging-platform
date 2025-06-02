import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';



@Resolver(() => User)

export class UserResolver {

  constructor(private userService: UserService) {}

  @Query(() => [User])


  users(): User[] {
    return this.userService.findAll();
  }


  @Query(() => User, { nullable: true })
  user(@Args('id') id: string): User | undefined {

    return this.userService.findOneById(id);

  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): User {
    return this.userService.createUser(createUserInput);
  }


}