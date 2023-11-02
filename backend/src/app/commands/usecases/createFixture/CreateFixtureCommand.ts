export class UpdateOrCreateFixtureCommand {
  public readonly api_foot_id: number;
  public readonly home_team_api_id: number;
  public readonly away_team_api_id: number;
  public readonly date: Date;
  public readonly home_team_goal: number;
  public readonly away_team_goal: number;
  public readonly status: 'OPEN' | 'ONGOING' | 'CLOSE';
  public readonly api_foot_league_id: number;

  constructor(
    api_foot_id: number,
    home_team_api_id: number,
    away_team_api_id: number,
    date: Date,
    home_team_goal: number,
    away_team_goal: number,
    status: 'OPEN' | 'ONGOING' | 'CLOSE',
    api_foot_league_id: number,
  ) {
    this.api_foot_id = api_foot_id;
    this.home_team_api_id = home_team_api_id;
    this.away_team_api_id = away_team_api_id;
    this.date = date;
    this.home_team_goal = home_team_goal;
    this.away_team_goal = away_team_goal;
    this.status = status;
    this.api_foot_league_id = api_foot_league_id;
  }
}
