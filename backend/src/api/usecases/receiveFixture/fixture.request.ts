export interface FixtureRequest {
  api_foot_id: number;
  home_team_id: number;
  away_team_id: number;
  date: Date;
  home_team_goal: number;
  away_team_goal: number;
  status: 'OPEN' | 'ONGOING' | 'CLOSE';
  api_foot_league_id: number;
}
