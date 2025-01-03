//  Defines the Teacher entity, representing a teacher in the school system.

import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Subject } from './subject.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Gender } from './school.types';
import { Course } from './course.entity';
import { Paginated } from '../pagination/paginator';

@Entity()
@ObjectType()
export class Teacher {
  constructor(partial?: Partial<Teacher>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  @Field()
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other,
  })
  @Field(() => Gender)
  gender: Gender;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  @Field(() => [Subject])
  subjects: Subject[];

  @OneToMany(() => Course, (course) => course.teacher)
  @Field(() => [Course])
  courses: Course[];
}

@ObjectType()
export class PaginatedTeachers extends Paginated<Teacher>(Teacher) {}
