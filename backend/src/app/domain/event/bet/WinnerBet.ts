import { Bet } from './bet';

export class WinnerBet extends Bet {
  private readonly _option: WinningOption;

  private constructor(id: string, winningOption: WinningOption, odd: number) {
    super(id, odd, undefined);
    this._option = winningOption;
  }

  public static build(id: string, winningOption: WinningOption, odd: number): WinnerBet {
    return new WinnerBet(id, winningOption, odd);
  }

  public static newWinnerBet(winningOption: WinningOption, odd: number): WinnerBet {
    return new WinnerBet(undefined, winningOption, odd);
  }

  get option(): WinningOption {
    return this._option;
  }
}

export enum WinningOption {
  HOME = 'HOME',
  DRAW = 'DRAW',
  AWAY = 'AWAY',
}
