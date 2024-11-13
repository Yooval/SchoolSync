// This file contains a custom GraphQL JWT authentication guard that protects GraphQL queries/mutations,
// ensuring requests are authenticated using JWT.

import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuardJwt } from './auth-guard.jwt';
import { ExecutionContext } from '@nestjs/common';
export class AuthGuardJwtGql extends AuthGuardJwt {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}