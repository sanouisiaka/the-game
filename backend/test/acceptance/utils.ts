import { PrismaService } from '../../src/config/prisma.service';

export async function createRandomFixture(prisma: PrismaService, fixture_api_foot_id: string) {
  return createFixtures(
    [{ id: fixture_api_foot_id, homeTeam: defaultTeams[0].name, awayTeam: defaultTeams[1].name, date: '2996-02-07', league: defaultLigues[0].name }],
    prisma,
  );
}

export async function createFixtures(
  fixtures: { id: string; homeTeam: string; awayTeam: string; date: string; league: string }[],
  prisma: PrismaService,
) {
  const transactions = fixtures.map((fixture) =>
    prisma.fixture.create({
      data: {
        api_foot_id: parseInt(fixture.id),
        away_team_goal: 0,
        home_team_goal: 0,
        date: new Date(fixture.date),
        Home_team: {
          connect: {
            api_foot_id: defaultTeams.find((t) => t.name === fixture.homeTeam).api_id,
          },
        },
        Away_team: {
          connect: {
            api_foot_id: defaultTeams.find((t) => t.name === fixture.awayTeam).api_id,
          },
        },
        Event: {
          create: {
            status: 'OPEN',
            League: {
              connect: {
                api_foot_id: defaultLigues.find((l) => l.name === fixture.league).api_foot_id,
              },
            },
          },
        },
      },
    }),
  );

  return prisma.$transaction(transactions);
}

export async function createLeague(prisma: PrismaService) {
  return prisma.league.createMany({
    data: defaultLigues,
  });
}
export async function createTeams(prisma: PrismaService, teams: { name: string; api_id: number }[]) {
  return prisma.team.createMany({
    data: teams.map((t) => {
      return {
        api_foot_id: t.api_id,
        name: t.name,
        code: t.name,
        logoUrl: 'https://alink.com',
      };
    }),
  });
}

export const defaultLigues = [
  {
    id: 1,
    api_foot_id: 61,
    name: 'Ligue 1',
    country: 'FR',
    logo: 'https://alink.com',
  },
  {
    id: 2,
    api_foot_id: 39,
    name: 'LIGA',
    country: 'ES',
    logo: 'https://alink.com',
  },
];

export const defaultTeams = [
  {
    name: 'PSG',
    api_id: 41,
  },
  {
    name: 'OM',
    api_id: 42,
  },
  {
    name: 'LYON',
    api_id: 40,
  },
  {
    name: 'RENNES',
    api_id: 50,
  },
  {
    name: 'ATLETICO',
    api_id: 43,
  },
  {
    name: 'REAL MADRID',
    api_id: 44,
  },
  {
    name: 'BARCELONE',
    api_id: 49,
  },
];
