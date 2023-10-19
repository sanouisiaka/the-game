export interface Fixture {
  api_foot_id: number;
  home_team_id: number;
  away_team_id: number;
  date: Date;
  home_team_goal: number;
  away_team_goal: number;
  status: FixtureStatus;
  api_foot_league_id: number;
}

export interface Team {
  api_foot_id: number;
  name: string;
  code: string;
  logo: string;
}

export interface Bet {
  type: BetType;
  api_foot_fixture_id: number;
  options: {
    value: string;
    odd: number;
  }[];
}

export enum FixtureStatus {
  OPEN = 'OPEN',
  ONGOING = 'ONGOING',
  CLOSE = 'CLOSE',
}

export enum BetType {
  WINNER = 'WINNER',
}

export enum League {
  LIGUE1 = 'LIGUE1',
  PL = 'PL',
  BL = 'BL',
  LIGA = 'LIGA',
  SERIEA = 'SERIEA',
}
