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

export function getWinnerId(fixture: Fixture): number | undefined{
  if (fixture?.status === 'CLOSE'){
    if(fixture.homeTeam.goal > fixture.awayTeam.goal){
      return fixture.homeTeam.id;
    } else if(fixture.homeTeam.goal < fixture.awayTeam.goal) {
      return fixture.awayTeam.id;
    }
  }
}