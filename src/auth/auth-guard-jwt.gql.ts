import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuardJwtGql extends AuthGuard('jwt') {
  // Override the getRequest method to work with the GraphQL context
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    return gqlContext.req;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    gqlContext.req.user = user;
    return user; // Return the user object to ensure it's attached to the GraphQL context
  }
}
