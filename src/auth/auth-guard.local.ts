//This is a custom authentication guard for handling local (non-JWT) authentication strategies.

import { AuthGuard } from "@nestjs/passport";

export class AuthGuardLocal extends AuthGuard('local') { }