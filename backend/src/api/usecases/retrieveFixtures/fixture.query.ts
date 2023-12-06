import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FixtureQuery {
  @IsInt()
  @Transform((t) => parseInt(t.value))
  leagueId: number;

  @IsNotEmpty()
  @Transform((t) => new Date(t.value))
  from: Date;

  @IsInt()
  @Transform((t) => parseInt(t.value))
  page: number;

  @IsOptional()
  @IsInt()
  @Transform((t) => parseInt(t.value))
  size: number;
}
