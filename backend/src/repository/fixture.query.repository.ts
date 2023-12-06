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
      include: {
        Event: { include: { Bets: { include: { Winner_bet: true } } } },
        Home_team: true,
        Away_team: true,
      },
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
        homeTeam: {
          id: fixtureDb.home_team_id,
          name: fixtureDb.Home_team.name,
          goal: fixtureDb.home_team_goal,
          logoUrl: fixtureDb.Home_team.logoUrl,
          code: fixtureDb.Home_team.code,
        } as FixtureDtoTeam,
        awayTeam: {
          id: fixtureDb.away_team_id,
          name: fixtureDb.Away_team.name,
          goal: fixtureDb.away_team_goal,
          logoUrl: fixtureDb.Away_team.logoUrl,
          code: fixtureDb.Away_team.code,
        } as FixtureDtoTeam,
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
    return new Page<FixtureDto>(fixtures, page, Math.floor(total / size) + 1, total);
  }
}
