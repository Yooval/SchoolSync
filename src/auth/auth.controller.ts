// This controller manages the authentication-related routes, handling user
// login, registration, and other related processes.

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { AuthGuardLocal } from './auth-guard.local';
import { AuthGuardJwt } from './auth-guard.jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>, // Inject user repository
  ) {}

  @Post('login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    // Fetch the full user details with relations
    const fullUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['profile'], // Include 'profile' relation if applicable
    });

    if (!fullUser) {
      throw new Error('User not found'); // Optional error handling
    }

    return fullUser;
  }
}
