export class CreateTeamCommand {
  public readonly api_foot_id: number;
  public readonly name: string;
  public readonly code: string;
  public readonly logoUrl: string;

  constructor(api_foot_id: number, name: string, code: string, logoUrl: string) {
    this.api_foot_id = api_foot_id;
    this.name = name;
    this.code = code;
    this.logoUrl = logoUrl;
  }
}
