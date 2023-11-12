import { MissingInformation } from '../../user/error/missingInformation.error';
import { InvalidGoalNumber } from './error/invalidGoalNumber.error';

export class FixtureTeam {
  private readonly _id: number;
  private _goal: number;

  constructor(teamId: number, goal: number) {
    if (!teamId) {
      throw new MissingInformation('team ');
    }

    this._id = teamId;
    this.updateGoal(goal);
  }

  public updateGoal(goal: number) {
    if (!goal) {
      this._goal = 0;
    }

    if (goal < 0) {
      throw new InvalidGoalNumber();
    }
    this._goal = goal;
  }

  get id(): number {
    return this._id;
  }

  get goal(): number {
    return this._goal;
  }
}
