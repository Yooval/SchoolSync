import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardJwt extends AuthGuard('jwt') {
  /**
   * @param context
   * @returns
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
    // Call the parent guard logic to validate the token
    const result = super.canActivate(context);

    // Extract and log the Authorization header
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract Bearer token
    console.log('Authorization Token:', token); // Debugging: Log the token

    console.log('After super.canActivate'); // Debugging: Log after activating guard

    return result;
  }

  /**
   * @param err
   * @param user
   * @param info
   * @param context
   * @returns
   * @throws
   */
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): any {
    if (err || !user) {
      throw err || new UnauthorizedException('User not authenticated');
    }

    const request = context.switchToHttp().getRequest();
    request.user = user;

    return user;
  }
}
