import { MissingInformation } from '../user/error/missingInformation.error';
import { InvalidLogoUrlError } from '../user/error/invalidLogoUrl.error';

export class League {
  private readonly _id: number;
  private readonly _api_foot_id: number;
  private readonly _name: string;
  private readonly _country: string;
  private readonly _logoUrl: string;

  private constructor(id: number, api_foot_id: number, name: string, country: string, logoUrl: string) {
    this._id = id;
    this._api_foot_id = api_foot_id;
    this._name = name;
    this._country = country;
    this._logoUrl = logoUrl;
  }

  public static newLeague(api_foot_id: number, name: string, country: string, logoUrl: string) {
    return League.build(undefined, api_foot_id, name, country, logoUrl);
  }

  public static build(id: number, api_foot_id: number, name: string, country: string, logoUrl: string) {
    if (!api_foot_id) {
      throw new MissingInformation('api_foot_id');
    }

    if (!name) {
      throw new MissingInformation('name');
    }

    if (!country) {
      throw new MissingInformation('country');
    }

    if (!logoUrl) {
      throw new MissingInformation('logoUrl');
    }
    if (!logoUrl.startsWith('https://')) {
      throw new InvalidLogoUrlError(logoUrl);
    }

    return new League(id, api_foot_id, name, country, logoUrl);
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

  get country(): string {
    return this._country;
  }

  get logoUrl(): string {
    return this._logoUrl;
  }
}
