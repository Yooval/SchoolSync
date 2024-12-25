import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Teacher, PaginatedTeachers } from './teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAddInput } from './input/teacher-add.input';
import { TeacherEditInput } from './input/teacher-edit.input';
import { EntityWithId } from './school.types';
import { AuthGuardJwtGql } from '../auth/auth-guard-jwt.gql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { paginate } from '../pagination/paginator';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(
    @InjectRepository(Teacher) // Ensure correct injection of the repository
    private readonly teachersRepository: Repository<Teacher>, // Declare the repository for Teacher entity
  ) {}

  @Query(() => PaginatedTeachers)
  public async teachers(): Promise<PaginatedTeachers> {
    return paginate<Teacher, PaginatedTeachers>(
      this.teachersRepository.createQueryBuilder(),
      PaginatedTeachers,
    );
  }

  @Query(() => Teacher) // Use Teacher for the query
  public async teacher(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<Teacher> {
    const teacher = await this.teachersRepository.findOne({
      where: { id },
      relations: ['subjects', 'courses'], // Include related fields if needed
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return teacher;
  }

  @Mutation(() => Teacher, { name: 'teacherAdd' })
  @UseGuards(AuthGuardJwtGql)
  public async add(
    @Args('input', { type: () => TeacherAddInput })
    input: TeacherAddInput,
  ): Promise<Teacher> {
    const newTeacher = new Teacher(input);
    const savedTeacher = await this.teachersRepository.save(newTeacher);

    // After adding the new teacher, print all teachers to debug
    const allTeachers = await this.teachersRepository.find();
    console.log('All Teachers:', allTeachers); // Log all teachers in the database

    return savedTeacher;
  }

  @Mutation(() => Teacher, { name: 'teacherEdit' })
  public async edit(
    @Args('id', { type: () => Int })
    id: number,
    @Args('input', { type: () => TeacherEditInput })
    input: TeacherEditInput,
  ): Promise<Teacher> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: { id },
    });
    return await this.teachersRepository.save(
      new Teacher(Object.assign(teacher, input)),
    );
  }

  @Mutation(() => EntityWithId, { name: 'teacherDelete' })
  public async delete(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<EntityWithId> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: { id },
    });
    await this.teachersRepository.remove(teacher);
    return new EntityWithId(id);
  }

  @ResolveField('subjects')
  public async subjects(@Parent() teacher: Teacher) {
    return await teacher.subjects;
  }
}
