// this file contains the core business logic for authentication,
// including methods for login, token generation, and user validation.

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './input/create.user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
      role: user.role, // Include role in JWT payload
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      this.logger.debug(`User ${username} not found!`);
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException();
    }
    return user;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, firstName, lastName, role } =
      createUserDto;

    const hashedPassword = await this.hashPassword(password);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      role, // Save role during user creation
    });

    return await this.userRepository.save(user);
  }
}
