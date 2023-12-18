export interface Fixture {

  id: string,
  leagueId: number,
  date: string,
  status: 'OPEN' | 'ONGOING' | 'CLOSE',
  homeTeam: {
    id: number,
    goal: number,
    name: string,
    code: string,
    logoUrl: string
  },
  awayTeam: {
    id: number,
    goal: number,
    name: string,
    code: string,
    logoUrl: string
  },
  winnerBets: {
    winOption: 'HOME' | 'DRAW' | 'AWAY';
    id: string;
    odd: number;
    status?: 'WIN' | 'LOOSE' | 'CANCEL';
  }[]
}