import { IsNotEmpty } from 'class-validator';

export class FixtureQuery {
  @IsNotEmpty()
  leagueId: number;

  @IsNotEmpty()
  from: Date;

  @IsNotEmpty()
  page: number;

  size: number;
}
