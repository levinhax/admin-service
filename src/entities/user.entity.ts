import { Entity, Column } from 'typeorm';
import BaseEntity from './base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column()
  name!: string;

  @Column()
  sex: string;

  @Column()
  age: number;
}
