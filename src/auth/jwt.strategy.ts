import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * JwtStrategy class handles the validation and processing of JWT tokens.
 * This strategy ensures the JWT token is valid, fetches the corresponding user
 * from the database, and attaches the user's role to the request object.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor initializes the JwtStrategy with configuration options for JWT extraction and validation.
   * @param userRepository Repository to interact with the User database entity.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      ignoreExpiration: false, // Enforce token expiration
      secretOrKey: process.env.AUTH_SECRET, // Use the same secret key that was used to sign the token
    });
  }

  /**
   * Validates the JWT token payload and fetches the user details from the database.
   * @param payload Decoded JWT payload containing user details (e.g., id, role).
   * @returns The authenticated user object with role information.
   * @throws UnauthorizedException if the user is not found in the database.
   */
  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Debugging: Log the decoded JWT payload

    // Fetch the user from the database using the ID (sub or id) from the payload
    const user = await this.userRepository.findOne({
      where: {
        id: payload.sub || payload.id, // Use 'sub' (standard JWT claim) or 'id' from the payload
      },
    });

    // If the user is not found, throw an UnauthorizedException
    if (!user) {
      console.log('User not found for ID:', payload.sub || payload.id); // Debugging: Log the missing user
      throw new UnauthorizedException('User not found');
    }

    console.log('User found in JwtStrategy:', user); // Debugging: Log the fetched user

    // Attach the role from the payload (or user entity) and return the user object
    const userWithRole = {
      ...user, // Spread the user properties
      role: payload.role || user.role, // Include the role from the payload or the database
    };

    console.log('User with Role:', userWithRole); // Debugging: Log the final user object with role
    return userWithRole;
  }
}
