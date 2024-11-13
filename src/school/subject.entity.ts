// Defines the Subject entity, representing a subject in the school system.

import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Teacher } from './teacher.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Course } from './course.entity';


@Entity()
@ObjectType()
export class Subject {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(
    () => Teacher, (teacher) => teacher.subjects, { cascade: true }
  )
  @JoinTable()

  teachers: Promise<Teacher[]>;

  @OneToMany(() => Course, (course) => course.subject)// course can contain many subjects
  @Field(() => [Course], { nullable: true })
  courses: Promise<Course[]>;
}