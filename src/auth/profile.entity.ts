// Defines the profile entity in the application, representing user
//profile data (e.g., preferences, additional user details).

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;
}