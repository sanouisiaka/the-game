import { Fixture } from '@/corelogic/domain/fixture/fixture';

export const randomFixtures = [{
  id: 'afeu-1553-77811',
  leagueId: 21,
  date: '1996/07/04',
  status: 'OPEN',
  homeTeam: {
    id: 7,
    goal: 3,
    name: 'Paris Saint-Germain',
    code: 'PSG',
    logoUrl: 'https://url.com',
  },
  awayTeam: {
    id: 69,
    goal: 0,
    name: 'Olympique de Marseille',
    code: 'OM',
    logoUrl: 'https://url.com',
  },
  winnerBets: [
    {
      winOption: 'HOME',
      id: '2432',
      odd: 1.23,
    },
    {
      winOption: 'AWAY',
      id: '20032',
      odd: 14.23,
    }],
},
  {
    id: 'isia-999-0193499',
    leagueId: 21,
    date: '2022/02/12',
    status: 'OPEN',
    homeTeam: {
      id: 99,
      goal: 2,
      name: 'Real Madrid',
      code: 'REAL',
      logoUrl: 'https://url.com',
    },
    awayTeam: {
      id: 27,
      goal: 0,
      name: 'BARCELONA',
      code: 'BARCA',
      logoUrl: 'https://url.com',
    },
    winnerBets: [
      {
        winOption: 'HOME',
        id: '2202',
        odd: 1.57,
      },
      {
        winOption: 'AWAY',
        id: '8764',
        odd: 3.01,
      }],
  }] as Fixture[];