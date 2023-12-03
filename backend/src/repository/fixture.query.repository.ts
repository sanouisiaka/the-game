import { Page } from '../app/queries/page';
import { IFixtureQueryRepository } from '../app/ports/query/fixture.query.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { FixtureDto, FixtureDtoTeam, FixtureDtoWinnerBet } from '../app/queries/dto/fixture';

@Injectable()
export class FixtureQueryRepository implements IFixtureQueryRepository {
  constructor(private prisma: PrismaService) {}

  async getIncomingFixtures(leagueId: number, from: Date, page: number, size: number): Promise<Page<FixtureDto>> {
    const where = {
      Event: {
        league_id: leagueId,
      },
      date: { gte: from },
    };
    const totalQuery = this.prisma.fixture.count({ where });
    const fixturesQuery = this.prisma.fixture.findMany({
      include: { Event: { include: { Bets: { include: { Winner_bet: true } } } } },
      orderBy: { date: 'asc' },
      where,
      skip: size * page,
      take: size,
    });

    const [total, fixturesDb] = await this.prisma.$transaction([totalQuery, fixturesQuery]);

    const fixtures = fixturesDb.map((fixtureDb) => {
      return {
        id: fixtureDb.Event.id,
        date: fixtureDb.date,
        leagueId: fixtureDb.Event.league_id,
        status: fixtureDb.Event.status,
        homeTeam: {} as FixtureDtoTeam,
        awayTeam: {} as FixtureDtoTeam,
        winnerBets: fixtureDb.Event.Bets.filter((b) => b.Winner_bet).map((b) => {
          return {
            id: b.Winner_bet.betId,
            winOption: b.Winner_bet.winner,
            odd: b.odd,
            status: b.status,
          } as FixtureDtoWinnerBet;
        }),
      } as FixtureDto;
    });
    return new Page<FixtureDto>(fixtures, page, total);
  }
}
