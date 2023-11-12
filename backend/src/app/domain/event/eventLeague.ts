import { MissingInformation } from '../user/error/missingInformation.error';

export class EventLeague {
  private readonly _id: number;

  constructor(id: number) {
    if (!id) {
      throw new MissingInformation('id');
    }
    this._id = id;
  }

  get id(): number {
    return this._id;
  }
}
