// Defines the module for the school system, handling the logic for subjects, teachers, and courses.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';
import { TeacherResolver } from './teacher.resolver';
import { SubjectResolver } from './subject.resolver';
import { CourseResolver } from './course.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher])],
  providers: [TeacherResolver, SubjectResolver, CourseResolver],// now it will be recognized as a graphql module.
  controllers: [],
})
export class SchoolModule { }