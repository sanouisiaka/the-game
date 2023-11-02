import { FixtureStatus } from './fixture.status';
import { FixtureTeam } from './fixtureTeam';
import { FixtureLeague } from './fixtureLeague';
import { MissingInformation } from '../user/error/missingInformation.error';

export class Fixture {
  private readonly _id: string;
  private readonly _api_foot_id: number;
  private _date: Date;
  private readonly _home_team: FixtureTeam;
  private readonly _away_team: FixtureTeam;
  private _status: FixtureStatus;
  private readonly _league: FixtureLeague;

  public updateFixtureInfo(date: Date, status: FixtureStatus, homeGoal: number, awayGoal: number) {
    this._home_team.updateGoal(homeGoal);
    this._away_team.updateGoal(awayGoal);
    this._date = date;
    this._status = status;
  }

  private constructor(
    id: string,
    api_foot_id: number,
    date: Date,
    home_team: FixtureTeam,
    away_team: FixtureTeam,
    status: FixtureStatus,
    league: FixtureLeague,
  ) {
    this._id = id;
    this._api_foot_id = api_foot_id;
    this._date = date;
    this._home_team = home_team;
    this._away_team = away_team;
    this._status = status;
    this._league = league;
  }

  public static build(
    id: string,
    api_foot_id: number,
    date: Date,
    home_team: FixtureTeam,
    away_team: FixtureTeam,
    status: FixtureStatus,
    league: FixtureLeague,
  ): Fixture {
    if (!api_foot_id) {
      throw new MissingInformation('api_foot_id');
    }
    if (!home_team) {
      throw new MissingInformation('api_foot_id');
    }

    if (!away_team) {
      throw new MissingInformation('api_foot_id');
    }

    if (!status) {
      throw new MissingInformation('fixture status');
    }

    if (!league) {
      throw new MissingInformation('league');
    }

    return new Fixture(id, api_foot_id, date, home_team, away_team, status, league);
  }

  public static newFixture(
    api_foot_id: number,
    date: Date,
    home_team: FixtureTeam,
    away_team: FixtureTeam,
    status: FixtureStatus,
    league: FixtureLeague,
  ): Fixture {
    return new Fixture(undefined, api_foot_id, date, home_team, away_team, status, league);
  }

  get id(): string {
    return this._id;
  }

  get api_foot_id(): number {
    return this._api_foot_id;
  }

  get date(): Date {
    return this._date;
  }

  get home_team(): FixtureTeam {
    return this._home_team;
  }

  get away_team(): FixtureTeam {
    return this._away_team;
  }

  get status(): FixtureStatus {
    return this._status;
  }

  get league(): FixtureLeague {
    return this._league;
  }
}
