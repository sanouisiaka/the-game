export class UpdateFixtureCommand {
  public readonly id: string;
  public readonly date: Date;
  public readonly home_team_goal: number;
  public readonly away_team_goal: number;
  public readonly status: 'OPEN' | 'ONGOING' | 'CLOSE';

  constructor(id: string, date: Date, home_team_goal: number, away_team_goal: number, status: 'OPEN' | 'ONGOING' | 'CLOSE') {
    this.id = id;
    this.date = date;
    this.home_team_goal = home_team_goal;
    this.away_team_goal = away_team_goal;
    this.status = status;
  }
}
