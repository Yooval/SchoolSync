import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Gender } from '../school.types';

// input fot adding teacher in graphql
@InputType()
export class TeacherAddInput {
  @Field()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @Field(() => Gender)
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}