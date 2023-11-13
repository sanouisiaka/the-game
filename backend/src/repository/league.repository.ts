import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { PrismaError } from './Prisma.error';
import { ILeagueRepository } from '../app/ports/league.repository.interface';
import { League } from '../app/domain/league/league';

@Injectable()
export class LeagueRepository implements ILeagueRepository {
  constructor(private prisma: PrismaService) {}

  async getLeagues(): Promise<League[]> {
    return this.prisma.league
      .findMany()
      .then((leaguesFromDb) =>
        leaguesFromDb.map((leagueFromDb) =>
          League.build(leagueFromDb.id, leagueFromDb.api_foot_id, leagueFromDb.name, leagueFromDb.country, leagueFromDb.logo),
        ),
      );
  }

  async getLeagueByApiFootId(apiFootId: number): Promise<League | null> {
    return this.prisma.league
      .findUnique({ where: { api_foot_id: apiFootId } })
      .then((leagueFromDb) => {
        if (leagueFromDb) {
          return League.build(leagueFromDb.id, leagueFromDb.api_foot_id, leagueFromDb.name, leagueFromDb.country, leagueFromDb.logo);
        }
      })
      .catch((e) => {
        throw new PrismaError(e);
      });
  }
}
