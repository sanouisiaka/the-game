import { MissingInformation } from '../user/error/missingInformation.error';
import { InvalidLogoUrlError } from '../user/error/invalidLogoUrl.error';

export class Team {
  private readonly _id: number;
  private readonly _api_foot_id: number;
  private readonly _name: string;
  private readonly _code: string;
  private readonly _logoUrl: string;

  private constructor(id: number, api_foot_id: number, name: string, code: string, logoUrl: string) {
    this._id = id;
    this._api_foot_id = api_foot_id;
    this._name = name;
    this._code = code;
    this._logoUrl = logoUrl;
  }

  public static newTeam(api_foot_id: number, name: string, code: string, logoUrl: string) {
    return Team.build(undefined, api_foot_id, name, code, logoUrl);
  }

  public static build(id: number, api_foot_id: number, name: string, code: string, logoUrl: string) {
    if (!api_foot_id) {
      throw new MissingInformation('api_foot_id');
    }

    if (!name) {
      throw new MissingInformation('name');
    }

    if (!code) {
      throw new MissingInformation('code');
    }

    if (!logoUrl) {
      throw new MissingInformation('logoUrl');
    }
    if (!logoUrl.startsWith('https://')) {
      throw new InvalidLogoUrlError(logoUrl);
    }

    return new Team(id, api_foot_id, name, code, logoUrl);
  }

  get id(): number {
    return this._id;
  }

  get api_foot_id(): number {
    return this._api_foot_id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get logoUrl(): string {
    return this._logoUrl;
  }
}
