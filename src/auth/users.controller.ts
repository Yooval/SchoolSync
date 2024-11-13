// The controller managing RESTful routes related to user operations like user creation, user deletion, etc.

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CreateUserDto } from './input/create.user.dto';


@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,

  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    const user = await this.userService.create(createUserDto);

    return {
      ...user,
      token: this.authService.getTokenForUser(user),
    };
  }
}