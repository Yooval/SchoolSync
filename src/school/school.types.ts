// Contains shared types and enums used across the school-related entities and services.
// Defines shared enums and types for the school module, such as gender or entity IDs.

import { Field, Int, registerEnumType, ObjectType } from '@nestjs/graphql';
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

@ObjectType()// help other module find entity with specific id before do something to him.
export class EntityWithId {
  constructor(id: number) {
    this.id = id;
  }
  @Field(() => Int)
  id: number;
}

registerEnumType(Gender, { name: 'Gender' });