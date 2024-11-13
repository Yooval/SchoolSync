// Contains shared types and enums used across the school-related entities and services.

import { Field, Int, registerEnumType, ObjectType } from '@nestjs/graphql';
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

@ObjectType()
export class EntityWithId {
  constructor(id: number) {
    this.id = id;
  }
  @Field(() => Int)
  id: number;
}

registerEnumType(Gender, { name: 'Gender' });