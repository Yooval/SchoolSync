import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql'; // Ensure GraphQL execution context is imported

/**
 * The `RolesGuard` class checks if the authenticated user has the required roles
 * to access a specific route or handler.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    console.log('Roles Required by Handler:', requiredRoles); // Debugging log

    if (!requiredRoles) {
      return true; // If no roles are specified, allow access
    }

    // Access the GraphQL context and get the user attached by AuthGuardJwtGql
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext?.req?.user;

    console.log('User from Request:', user); // Debugging log

    if (!user) {
      console.log('Access Denied: No user found in request'); // Debugging log
      throw new UnauthorizedException('User is not authenticated');
    }

    // Normalize user roles (single role or array of roles)
    const userRoles = Array.isArray(user.roles) ? user.roles : [user.role];
    console.log('User Roles:', userRoles); // Debugging log

    // Check if the user's roles include at least one of the required roles
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      console.log(
        `Access Denied: User roles "${userRoles}" do not match required roles "${requiredRoles}"`,
      ); // Debugging log
      throw new UnauthorizedException(
        'You do not have access to this resource',
      );
    }

    return true; // User has a valid role
  }
}
