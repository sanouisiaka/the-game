import { EventStatus } from './event.status';
import { MissingInformation } from '../user/error/missingInformation.error';
import { EventLeague } from './eventLeague';
import { Bet } from './bet/bet';
import { WinnerBet } from './bet/WinnerBet';
import { MultipleWinnerBet } from './bet/error/multipleWinnerBet.error';

export abstract class Event {
  private readonly _id: string;
  private _status: EventStatus;
  private _league: EventLeague;
  private _bets: Bet[];

  public updateEventStatus(status: EventStatus) {
    this._status = status;
  }

  protected constructor(id: string, status: EventStatus, league: EventLeague, bets: Bet[]) {
    if (!status) {
      throw new MissingInformation('event status');
    }

    if (!league) {
      throw new MissingInformation('league');
    }
    this.validateBets(bets);

    this._id = id;
    this._status = status;
    this._league = league;
    this._bets = bets;
  }

  private validateBets(bets: Bet[]): void {
    if (bets && bets.length > 0) {
      const winnerBets = bets.filter((b) => b instanceof WinnerBet);
      const distinctBet = new Set(winnerBets.map((b: WinnerBet) => b.option));
      if (distinctBet.size !== winnerBets.length) {
        throw new MultipleWinnerBet(this._id, winnerBets);
      }
    }
  }

  get id(): string {
    return this._id;
  }

  get status(): EventStatus {
    return this._status;
  }

  get league(): EventLeague {
    return this._league;
  }

  get bets(): Bet[] {
    return this._bets;
  }
}
