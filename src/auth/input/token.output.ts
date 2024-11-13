// Defines the structure of the token response after successful login or authentication.

import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class TokenOutput {
  constructor(partial?: Partial<TokenOutput>) {
    Object.assign(this, partial);
  }
  @Field()
  token: string;
}