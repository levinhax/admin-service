export class CreateUserDto {
  readonly id: number;
  readonly name: string;
  password: string;
  readonly email: string;
  readonly sex: string;
  readonly age: number;
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
