import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  // readonly id: number;
  // readonly name: string;
  // password: string;
  // readonly email: string;
  // readonly sex: string;
  // readonly age: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sex: string;

  @IsOptional()
  @IsNumber()
  age: number;
}

export class UpdateUserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly age: number;
}

export class ListAllEntities {
  readonly pageIndex: number;
  readonly pageSize: number;
}
