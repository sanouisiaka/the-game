export class RetrieveFixturesQuery {
  leagueId: number;
  from: Date;
  page: number;
  size: number;

  constructor(leagueId: number, from: Date, page: number, size: number) {
    this.leagueId = leagueId;
    this.from = from;
    this.page = page;
    this.size = size;
  }
}
