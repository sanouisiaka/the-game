import { Injectable } from '@nestjs/common';
import { Team } from '../../app/domain/team/team';
import { PrismaService } from '../../config/prisma.service';
import { PrismaError } from '../Prisma.error';
import { ILeagueRepository } from '../../app/ports/league.repository.interface';
import { League } from '../../app/domain/league/league';

@Injectable()
export class LeagueRepository implements ILeagueRepository {
  constructor(private prisma: PrismaService) {}

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

  async getTeamByApiFootId(apiFootId: number): Promise<Team> {
    return this.prisma.team
      .findUnique({ where: { api_foot_id: apiFootId } })
      .then((teamForDb) => Team.build(teamForDb.id, teamForDb.api_foot_id, teamForDb.name, teamForDb.code, teamForDb.logoUrl))
      .catch((e) => {
        throw new PrismaError(e);
      });
  }

  async createTeam(team: Team): Promise<Team> {
    return this.prisma.team
      .create({
        data: {
          id: team.id,
          api_foot_id: team.api_foot_id,
          code: team.code,
          name: team.name,
          logoUrl: team.logoUrl,
        },
      })
      .then(() => team);
  }

  async updateTeam(team: Team): Promise<Team> {
    return this.prisma.team
      .update({
        where: { id: team.id },
        data: {
          id: team.id,
          api_foot_id: team.api_foot_id,
          code: team.code,
          name: team.name,
          logoUrl: team.logoUrl,
        },
      })
      .then(() => team);
  }
}
