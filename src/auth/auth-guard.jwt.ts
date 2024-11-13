// Implements the JWT authentication guard, used to protect routes and ensure that requests have valid JWT tokens.

import { AuthGuard } from "@nestjs/passport";

export class AuthGuardJwt extends AuthGuard('jwt') { } // Implements a JWT guard to protect routes.