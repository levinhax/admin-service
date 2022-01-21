import { IsEmail, IsString, IsNumber } from 'class-validator';

export class UserModel {
  readonly id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  sex?: string;

  @IsNumber()
  age?: number;
}
