import { UpdateOrCreateFixtureCommand } from './CreateFixtureCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { FixtureStatus } from '../../../domain/fixture/fixture.status';
import { Fixture } from '../../../domain/fixture/fixture';
import { FixtureTeam } from '../../../domain/fixture/fixtureTeam';
import { FixtureLeague } from '../../../domain/fixture/fixtureLeague';
import { ITeamRepository } from '../../../ports/team.repository.interface';
import { TeamNotFound } from '../../../domain/team/error/teamNotFound.error';

@CommandHandler(UpdateOrCreateFixtureCommand)
export class UpdateOrCreateFixtureCommandHandler implements ICommandHandler<UpdateOrCreateFixtureCommand, Fixture> {
  constructor(
    @Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository,
    @Inject(ITeamRepository) private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(command: UpdateOrCreateFixtureCommand): Promise<Fixture> {
    return this.fixtureRepository.getFixtureByApiFootId(command.api_foot_id).then((fixtureFromDb) => {
      if (fixtureFromDb) {
        return this.updateFixture(fixtureFromDb, command);
      } else {
        return this.createFixture(command);
      }
    });
  }

  private async updateFixture(fixtureFromDb: Fixture, command: UpdateOrCreateFixtureCommand): Promise<Fixture> {
    fixtureFromDb.updateFixtureInfo(command.date, FixtureStatus[command.status], command.home_team_goal, command.away_team_goal);
    return this.fixtureRepository.updateFixtureInfo(fixtureFromDb);
  }

  private async createFixture(command: UpdateOrCreateFixtureCommand): Promise<Fixture> {
    return this.teamRepository.getTeamByApiFootId(command.home_team_api_id).then((homeTeam) => {
      if (homeTeam) {
        return this.teamRepository.getTeamByApiFootId(command.away_team_api_id).then((awayTeam) => {
          if (awayTeam) {
            const newFixture = Fixture.newFixture(
              command.api_foot_id,
              command.date,
              new FixtureTeam(homeTeam.id, command.home_team_goal),
              new FixtureTeam(awayTeam.id, command.away_team_goal),
              FixtureStatus[command.status],
              new FixtureLeague(command.api_foot_league_id),
            );
            return this.fixtureRepository.createFixture(newFixture);
          } else {
            throw new TeamNotFound(command.away_team_api_id);
          }
        });
      } else {
        throw new TeamNotFound(command.home_team_api_id);
      }
    });
  }
}
