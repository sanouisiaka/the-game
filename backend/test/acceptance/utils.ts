import { PrismaService } from '../../src/config/prisma.service';

export async function createFixture(prisma: PrismaService, fixture_api_foot_id: number) {
  return prisma.fixture.create({
    data: {
      api_foot_id: fixture_api_foot_id,
      away_team_goal: 0,
      home_team_goal: 0,
      date: new Date(),
      Home_team: {
        connect: {
          api_foot_id: defaultTeams[1].api_id,
        },
      },
      Away_team: {
        connect: {
          api_foot_id: defaultTeams[0].api_id,
        },
      },
      Event: {
        create: {
          status: 'OPEN',
          League: {
            connect: {
              api_foot_id: 61,
            },
          },
        },
      },
    },
  });
}

export async function createLeague(prisma: PrismaService) {
  return prisma.league.create({
    data: {
      api_foot_id: 61,
      name: 'Ligue 1',
      country: 'FR',
      logo: 'https://alink.com',
    },
  });
}

export const defaultTeams = [
  {
    name: 'PSG',
    api_id: 41,
  },
  {
    name: 'OM',
    api_id: 42,
  },
];

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
