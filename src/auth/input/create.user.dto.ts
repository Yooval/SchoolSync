import { IsEmail, Length, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserDoesNotExist } from '../validation/user-does-not-exist.constraint';
import { Field, InputType } from '@nestjs/graphql';
import { IsRepeated } from '../../validation/is-repeated.constraint';
import { UserRole } from '../user.entity'; // Import UserRole enum

@InputType('UserAddInput')
export class CreateUserDto {
  @Length(5)
  @UserDoesNotExist()
  @Field()
  username: string;

  @Length(8)
  @Field()
  password: string;

  @Length(8)
  @IsRepeated('password')
  @Field()
  retypedPassword: string;

  @Length(2)
  @Field()
  firstName: string;

  @Length(2)
  @Field()
  lastName: string;

  @IsEmail()
  @UserDoesNotExist()
  @Field()
  email: string;

  @Transform(({ value }) => value.toUpperCase()) // Convert input to uppercase
  @IsEnum(UserRole, {
    message: 'Role must be either TEACHER or STUDENT (case insensitive)',
  })
  @Field(() => String)
  role: UserRole; // Add role field
}
