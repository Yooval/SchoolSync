// This file defines the input data structure for login functionality, providing the necessary
//fields for logging in a user.

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}