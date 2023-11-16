import { Injectable } from '@nestjs/common';
import { ITeamRepository } from '../app/ports/team.repository.interface';
import { Team } from '../app/domain/team/team';
import { PrismaService } from '../config/prisma.service';
import { PrismaError } from './Prisma.error';

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(private prisma: PrismaService) {}

  async getTeamByApiFootId(apiFootId: number): Promise<Team> {
    return this.prisma.team
      .findUnique({ where: { api_foot_id: apiFootId } })
      .then((teamForDb) => {
        if (teamForDb) {
          return Team.build(teamForDb.id, teamForDb.api_foot_id, teamForDb.name, teamForDb.code, teamForDb.logoUrl);
        }
      })
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
}
