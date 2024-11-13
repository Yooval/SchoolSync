//Resolver to handle GraphQL queries/mutations related to authentication (login, registration, etc.).

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TokenOutput } from './input/token.output';
import { AuthService } from './auth.service';
import { LoginInput } from './input/login.input';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }
  @Mutation(() => TokenOutput, { name: 'login' }) // return TokenOutput.
  public async login(
    @Args('input', { type: () => LoginInput })
    input: LoginInput,
  ): Promise<TokenOutput> {
    return new TokenOutput({
      token: this.authService.getTokenForUser(
        await this.authService.validateUser(input.username, input.password),
      ),
    });
  }
}