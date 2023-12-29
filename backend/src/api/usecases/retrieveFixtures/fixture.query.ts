import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FixtureQuery {
  @IsInt()
  @IsOptional()
  @Transform((t) => parseInt(t.value))
  leagueId: number;

  @IsOptional()
  @Transform((t) => new Date(t.value))
  before: Date;

  @IsOptional()
  @Transform((t) => new Date(t.value))
  after: Date;

  @IsInt()
  @Transform((t) => parseInt(t.value))
  page: number;

  @IsOptional()
  @IsInt()
  @Transform((t) => parseInt(t.value))
  size: number;
}
