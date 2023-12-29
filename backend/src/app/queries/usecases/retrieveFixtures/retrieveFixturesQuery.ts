export class RetrieveFixturesQuery {
  leagueId: number;
  before: Date;
  after: Date;
  page: number;
  size: number;

  constructor(leagueId: number, before: Date, after: Date, page: number, size: number) {
    this.leagueId = leagueId;
    this.before = before;
    this.after = after;
    this.page = page;
    this.size = size;
  }
}
