import { MissingInformation } from '../../user/error/missingInformation.error';
import { IncorrectOdd } from './error/incorrectOdd.error';

export abstract class Bet {
  private _id: string;

  private _odd: number;

  private _status: BetStatus;

  public updateOdd(newOdd: number) {
    if (newOdd <= 1) {
      throw new IncorrectOdd();
    }
    this._odd = newOdd;
  }

  constructor(id: string, odd: number, status: BetStatus) {
    if (!odd) {
      throw new MissingInformation('odd');
    }

    if (odd <= 1) {
      throw new IncorrectOdd();
    }
    this._id = id;
    this._odd = odd;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }

  get odd(): number {
    return this._odd;
  }

  get status(): BetStatus {
    return this._status;
  }
}

export enum BetType {
  WINNER = 'WINNER',
}

enum BetStatus {
  WIN = 'WIN',
  LOOSE = 'LOOSE',
  CANCEL = 'CANCEL',
}
