export const apiErrorResponse = {
  get: 'whatever',
  parameters: {},
  errors: ['the request is not correct'],
  paging: {},
  response: [
    {
      fixture: {
        id: 1044881,
        referee: 'B. Dechepy',
        timezone: 'UTC',
        date: '2023-08-12T19:00:00+00:00',
      },
    },
  ],
};

export const apiFootballFixturesResponse = {
  get: 'fixtures',
  parameters: {
    league: '61',
    season: '2023',
  },
  errors: [],
  results: 306,
  paging: {
    current: 1,
    total: 1,
  },
  response: [
    {
      fixture: {
        id: 1044881,
        referee: 'B. Dechepy',
        timezone: 'UTC',
        date: '2023-08-12T19:00:00+00:00',
        timestamp: 1691866800,
        periods: {
          first: 1691866800,
          second: 1691870400,
        },
        venue: {
          id: 671,
          name: 'Parc des Princes',
          city: 'Paris',
        },
        status: {
          long: 'Match Finished',
          short: 'FT',
          elapsed: 90,
        },
      },
      league: {
        id: 61,
        name: 'Ligue 1',
        country: 'France',
        logo: 'https://media-4.api-sports.io/football/leagues/61.png',
        flag: 'https://media-4.api-sports.io/flags/fr.svg',
        season: 2023,
        round: 'Regular Season - 1',
      },
      teams: {
        home: {
          id: 85,
          name: 'Paris Saint Germain',
          logo: 'https://media-4.api-sports.io/football/teams/85.png',
          winner: null,
        },
        away: {
          id: 97,
          name: 'Lorient',
          logo: 'https://media-4.api-sports.io/football/teams/97.png',
          winner: null,
        },
      },
      goals: {
        home: 0,
        away: 0,
      },
      score: {
        halftime: {
          home: 0,
          away: 0,
        },
        fulltime: {
          home: 0,
          away: 0,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
  ],
};

export const apiFootballTeamsResponse = {
  get: 'teams',
  parameters: {
    league: '61',
    season: '2023',
  },
  errors: [],
  results: 18,
  paging: {
    current: 1,
    total: 1,
  },
  response: [
    {
      team: {
        id: 79,
        name: 'Lille',
        code: 'LIL',
        country: 'France',
        founded: 1944,
        national: false,
        logo: 'https://media-4.api-sports.io/football/teams/79.png',
      },
      venue: {
        id: 19207,
        name: 'Decathlon Arena – Stade Pierre-Mauroy',
        address: '261, Boulevard de Tournai, l&apos;Hôtel de Ville',
        city: 'Villeneuve d&apos;Ascq',
        capacity: 50083,
        surface: 'grass',
        image: 'https://media-4.api-sports.io/football/venues/19207.png',
      },
    },
    {
      team: {
        id: 80,
        name: 'Lyon',
        code: 'LYO',
        country: 'France',
        founded: 1950,
        national: false,
        logo: 'https://media-4.api-sports.io/football/teams/80.png',
      },
      venue: {
        id: 666,
        name: 'Groupama Stadium',
        address: 'Chemin du Montout',
        city: 'Décines-Charpieu',
        capacity: 61556,
        surface: 'grass',
        image: 'https://media-4.api-sports.io/football/venues/666.png',
      },
    },
  ],
};

export const apiFootballOddsResponse = {
  get: 'odds',
  parameters: {
    league: '61',
    season: '2023',
    bookmaker: '16',
    bet: '1',
  },
  errors: [],
  results: 9,
  paging: {
    current: 1,
    total: 1,
  },
  response: [
    {
      league: {
        id: 61,
        name: 'Ligue 1',
        country: 'France',
        logo: 'https://media-4.api-sports.io/football/leagues/61.png',
        flag: 'https://media-4.api-sports.io/flags/fr.svg',
        season: 2023,
      },
      fixture: {
        id: 1044959,
        timezone: 'UTC',
        date: '2023-10-21T19:00:00+00:00',
        timestamp: 1697914800,
      },
      update: '2023-10-18T02:30:55+00:00',
      bookmakers: [
        {
          id: 16,
          name: 'Unibet',
          bets: [
            {
              id: 1,
              name: 'Match Winner',
              values: [
                {
                  value: 'Home',
                  odd: '2.32',
                },
                {
                  value: 'Draw',
                  odd: '3.40',
                },
                {
                  value: 'Away',
                  odd: '3.05',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      league: {
        id: 61,
        name: 'Ligue 1',
        country: 'France',
        logo: 'https://media-4.api-sports.io/football/leagues/61.png',
        flag: 'https://media-4.api-sports.io/flags/fr.svg',
        season: 2023,
      },
      fixture: {
        id: 1044953,
        timezone: 'UTC',
        date: '2023-10-21T15:00:00+00:00',
        timestamp: 1697900400,
      },
      update: '2023-10-18T02:30:55+00:00',
      bookmakers: [
        {
          id: 16,
          name: 'Unibet',
          bets: [
            {
              id: 1,
              name: 'Match Winner',
              values: [
                {
                  value: 'Home',
                  odd: '1.21',
                },
                {
                  value: 'Draw',
                  odd: '6.50',
                },
                {
                  value: 'Away',
                  odd: '13.00',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      league: {
        id: 61,
        name: 'Ligue 1',
        country: 'France',
        logo: 'https://media-4.api-sports.io/football/leagues/61.png',
        flag: 'https://media-4.api-sports.io/flags/fr.svg',
        season: 2023,
      },
      fixture: {
        id: 1044954,
        timezone: 'UTC',
        date: '2023-10-22T13:00:00+00:00',
        timestamp: 1697979600,
      },
      update: '2023-10-18T02:31:05+00:00',
      bookmakers: [
        {
          id: 16,
          name: 'Unibet',
          bets: [
            {
              id: 1,
              name: 'Match Winner',
              values: [
                {
                  value: 'Home',
                  odd: '3.00',
                },
                {
                  value: 'Draw',
                  odd: '3.50',
                },
                {
                  value: 'Away',
                  odd: '2.32',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
