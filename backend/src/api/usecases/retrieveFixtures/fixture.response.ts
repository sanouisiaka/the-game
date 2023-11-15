export class FixtureResponse {
  id: string;
  date: string;
  status: string;
  leagueId: number;
  winnerBets: {
    id: string;
    option: string;
    odd: number;
    status: string;
  }[];
  homeTeam: {
    id: number;
    goal: number;
  };
  awayTeam: {
    id: number;
    goal: number;
  };
}
