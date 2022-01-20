export class CreateCatDto {
  readonly name: string;
  readonly age: number;
}

export class UpdateCatDto {
  readonly id: number;
  readonly name: string;
  readonly age: number;
}

export class ListAllEntities {
  readonly pageIndex: number;
  readonly pageSize: number;
}
