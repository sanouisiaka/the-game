export class LeagueDto {
  name: string;
  country: string;
  logoUrl: string;

  constructor(name: string, country: string, logoUrl: string) {
    this.name = name;
    this.country = country;
    this.logoUrl = logoUrl;
  }
}
