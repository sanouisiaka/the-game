import { Fixture } from '../../app/domain/event/fixture/fixture';
import { FixtureTeam } from '../../app/domain/event/fixture/fixtureTeam';
import { EventLeague } from '../../app/domain/event/eventLeague';
import { EventStatus } from '../../app/domain/event/event.status';
import { Injectable } from '@nestjs/common';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { PrismaService } from '../../config/prisma.service';
import { PrismaError } from '../Prisma.error';
import { WinnerBet, WinningOption } from '../../app/domain/event/bet/WinnerBet';

@Injectable()
export class FixtureRepository implements IFixtureRepository {
  constructor(private prisma: PrismaService) {}

  async getIdByApiFootId(apiFootId: number): Promise<string> {
    return this.prisma.fixture.findUnique({ where: { api_foot_id: apiFootId } }).then((r) => (r ? r.eventId : undefined));
  }

  async getFixture(id: string): Promise<Fixture | null> {
    return this.prisma.fixture
      .findFirst({ where: { eventId: id }, include: { Event: { include: { Bets: { include: { Winner_bet: true } } } } } })
      .then((fixtureDb) => {
        if (fixtureDb) {
          const winnerBets: WinnerBet[] = fixtureDb.Event.Bets.filter((b) => b.Winner_bet).map((b) =>
            WinnerBet.build(b.Winner_bet.betId, WinningOption[b.Winner_bet.winner], b.odd),
          );
          return Fixture.build(
            fixtureDb.Event.id,
            fixtureDb.api_foot_id,
            fixtureDb.date,
            new FixtureTeam(fixtureDb.home_team_id, fixtureDb.home_team_goal),
            new FixtureTeam(fixtureDb.away_team_id, fixtureDb.away_team_goal),
            EventStatus[fixtureDb.Event.status],
            new EventLeague(fixtureDb.Event.league_id),
            winnerBets,
          );
        }
        return null;
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
        where: { eventId: fixture.id },
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

  async updateFixtureBets(fixture: Fixture): Promise<Fixture> {
    const betUpdates = fixture.bets
      .filter((b) => b.id)
      .map((b) =>
        this.prisma.bet.update({
          where: { id: b.id },
          data: {
            odd: b.odd,
            status: b.status,
          },
        }),
      );

    const newWinnerBets = fixture.bets
      .filter((b) => !b.id)
      .filter((b) => b instanceof WinnerBet)
      .map((b: WinnerBet) =>
        this.prisma.bet.create({
          data: { eventId: fixture.id, odd: b.odd, status: b.status, Winner_bet: { create: { winner: b.option } } },
        }),
      );

    return this.prisma.$transaction([...betUpdates, ...newWinnerBets]).then(() => fixture);
  }
}
