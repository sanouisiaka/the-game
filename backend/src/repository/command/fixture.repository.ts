import { Fixture } from '../../app/domain/fixture/fixture';
import { FixtureTeam } from '../../app/domain/fixture/fixtureTeam';
import { FixtureLeague } from '../../app/domain/fixture/fixtureLeague';
import { FixtureStatus } from '../../app/domain/fixture/fixture.status';
import { Injectable } from '@nestjs/common';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { PrismaService } from '../../config/prisma.service';
import { PrismaError } from '../Prisma.error';

@Injectable()
export class FixtureRepository implements IFixtureRepository {
  constructor(private prisma: PrismaService) {}

  async getIdByApiFootId(apiFootId: number): Promise<string> {
    return this.prisma.fixture.findUnique({ where: { api_foot_id: apiFootId } }).then((r) => (r ? r.id : undefined));
  }

  async getFixture(id: string): Promise<Fixture | null> {
    return this.prisma.fixture
      .findFirst({ where: { id }, include: { Event: true } })
      .then((fixtureDb) => {
        if (fixtureDb) {
          return Fixture.build(
            fixtureDb.id,
            fixtureDb.api_foot_id,
            fixtureDb.date,
            new FixtureTeam(fixtureDb.home_team_id, fixtureDb.home_team_goal),
            new FixtureTeam(fixtureDb.away_team_id, fixtureDb.away_team_goal),
            FixtureStatus[fixtureDb.Event.status],
            new FixtureLeague(fixtureDb.Event.league_id),
          );
        }
      })
      .catch((e) => {
        throw new PrismaError(e);
      });
  }

  async createFixture(fixture: Fixture): Promise<Fixture> {
    return this.prisma.event
      .create({
        data: {
          status: fixture.status,
          league_id: fixture.league.id,
          Fixture: {
            create: {
              date: fixture.date,
              api_foot_id: fixture.api_foot_id,
              Away_team: {
                connect: {
                  id: fixture.home_team.id,
                },
              },
              Home_team: {
                connect: {
                  id: fixture.away_team.id,
                },
              },
              home_team_goal: fixture.home_team.goal,
              away_team_goal: fixture.away_team.goal,
            },
          },
        },
      })
      .then(() => fixture);
  }

  async updateFixtureInfo(fixture: Fixture): Promise<Fixture> {
    return this.prisma.fixture
      .update({
        where: { id: fixture.id },
        data: {
          date: fixture.date,
          home_team_goal: fixture.home_team.goal,
          away_team_goal: fixture.away_team.goal,
          Event: {
            update: {
              status: fixture.status,
            },
          },
        },
      })
      .then(() => fixture);
  }
}
