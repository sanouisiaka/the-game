import { EventStatus } from '../event.status';
import { FixtureTeam } from './fixtureTeam';
import { EventLeague } from '../eventLeague';
import { MissingInformation } from '../../user/error/missingInformation.error';
import { Event } from '../event';
import { Bet } from '../bet/bet';
import { WinnerBet, WinningOption } from '../bet/WinnerBet';

export class Fixture extends Event {
  private readonly _api_foot_id: number;
  private _date: Date;
  private readonly _home_team: FixtureTeam;
  private readonly _away_team: FixtureTeam;

  public updateFixtureInfo(date: Date, status: EventStatus, homeGoal: number, awayGoal: number) {
    this._home_team.updateGoal(homeGoal);
    this._away_team.updateGoal(awayGoal);
    this._date = date;
    this.updateEventStatus(status);
  }

  public updateWinnerBet(winnerOption: WinningOption, newOdd: number) {
    const currentBet = this.bets.find((b: Bet) => b instanceof WinnerBet && b.option === winnerOption);
    if (currentBet) {
      currentBet.updateOdd(newOdd);
    } else {
      this.bets.push(WinnerBet.newWinnerBet(winnerOption, newOdd));
    }
  }

  private constructor(
    id: string,
    api_foot_id: number,
    date: Date,
    home_team: FixtureTeam,
    away_team: FixtureTeam,
    status: EventStatus,
    league: EventLeague,
    bets: Bet[],
  ) {
    super(id, status, league, bets);

    if (!api_foot_id) {
      throw new MissingInformation('api_foot_id');
    }
    if (!home_team) {
      throw new MissingInformation('api_foot_id');
    }

    if (!away_team) {
      throw new MissingInformation('api_foot_id');
    }

    this._api_foot_id = api_foot_id;
    this._date = date;
    this._home_team = home_team;
    this._away_team = away_team;
  }

  public static build(
    id: string,
    api_foot_id: number,
    date: Date,
    home_team: FixtureTeam,
    away_team: FixtureTeam,
    status: EventStatus,
    league: EventLeague,
    bets: Bet[],
  ): Fixture {
    return new Fixture(id, api_foot_id, date, home_team, away_team, status, league, bets);
  }

  public static newFixture(
    api_foot_id: number,
    date: Date,
    home_team: FixtureTeam,
    away_team: FixtureTeam,
    status: EventStatus,
    league: EventLeague,
  ): Fixture {
    return new Fixture(undefined, api_foot_id, date, home_team, away_team, status, league, []);
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
}
