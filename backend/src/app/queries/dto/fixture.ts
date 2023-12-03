export type FixtureDto = {
  id: string;
  date: Date;
  status: 'OPEN' | 'ONGOING' | 'CLOSE';
  leagueId: number;
  homeTeam: FixtureDtoTeam;
  awayTeam: FixtureDtoTeam;
  winnerBets: FixtureDtoWinnerBet[];
};

export type FixtureDtoTeam = {
  id: number;
  goal: number;
  name: string;
  code: string;
  logoUrl: string;
};

export type FixtureDtoWinnerBet = {
  winOption: 'HOME' | 'DRAW' | 'AWAY';
  id: string;
  odd: number;
  status: 'WIN' | 'LOOSE' | 'CANCEL';
};
