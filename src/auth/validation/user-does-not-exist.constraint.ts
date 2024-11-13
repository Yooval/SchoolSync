// user-does-not-exist.constraint.ts

import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
@ValidatorConstraint({ async: true })
export class UserDoesNotExistConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async validate(
    value: any, // email/username anything we wiil checked.
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const entity = await this.userRepository.findOneBy({
      [validationArguments.property]: value,
    });
    return entity === null;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} already taken`;
  }
}
export function UserDoesNotExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserDoesNotExistConstraint,
    });
  };
}