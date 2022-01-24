import { IsOptional } from 'class-validator';

export class QueryOptionsDto {
  @IsOptional()
  readonly pageIndex?: number;

  @IsOptional()
  readonly pageSize?: number;
}
