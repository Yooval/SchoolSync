//Defines the strategy for JWT authentication in the application, used to validate and decode JWT tokens.

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // after Expiration we will have to force users to login again
      secretOrKey: process.env.AUTH_SECRET
    })
  }

  async validate(payload: any) {
    return await this.userRepository.findOne({
      where: {
        id: payload.sub,
      },
    });
  }
}