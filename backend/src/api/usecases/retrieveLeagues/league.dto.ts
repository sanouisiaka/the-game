export class LeagueDto {
  id: number;
  name: string;
  country: string;
  logoUrl: string;

  constructor(id: number, name: string, country: string, logoUrl: string) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.logoUrl = logoUrl;
  }
}
