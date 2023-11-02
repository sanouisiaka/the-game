import { CreateFixtureCommand } from './createFixtureCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { FixtureStatus } from '../../../domain/fixture/fixture.status';
import { Fixture } from '../../../domain/fixture/fixture';
import { FixtureTeam } from '../../../domain/fixture/fixtureTeam';
import { FixtureLeague } from '../../../domain/fixture/fixtureLeague';
import { ITeamRepository } from '../../../ports/team.repository.interface';
import { TeamNotFound } from '../../../domain/team/error/teamNotFound.error';
import { FixtureAlreadyExists } from '../../../domain/fixture/error/fixtureAlreadyExists.error';
import { CannotPlayAgainstHimself } from '../../../domain/fixture/error/CannotPlayAgainstHimself.error';
import { ILeagueRepository } from '../../../ports/league.repository.interface';
import { LeagueNotFound } from '../../../domain/league/error/leagueNotFound.error';
import { League } from '../../../domain/league/league';
import { Team } from '../../../domain/team/team';

@CommandHandler(CreateFixtureCommand)
export class CreateFixtureCommandHandler implements ICommandHandler<CreateFixtureCommand, Fixture> {
  constructor(
    @Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository,
    @Inject(ITeamRepository) private readonly teamRepository: ITeamRepository,
    @Inject(ILeagueRepository) private readonly leagueRepository: ILeagueRepository,
  ) {}

  async execute(command: CreateFixtureCommand): Promise<Fixture> {
    if (command.home_team_api_id === command.away_team_api_id) {
      throw new CannotPlayAgainstHimself();
    }
    return this.fixtureRepository.getIdByApiFootId(command.api_foot_id).then((fixtureId) => {
      if (fixtureId) {
        throw new FixtureAlreadyExists(fixtureId);
      } else {
        return this.leagueRepository.getLeagueByApiFootId(command.league_api_id).then((league) => {
          if (league) {
            return this.teamRepository.getTeamByApiFootId(command.home_team_api_id).then((homeTeam) => {
              if (homeTeam) {
                return this.teamRepository.getTeamByApiFootId(command.away_team_api_id).then((awayTeam) => {
                  if (awayTeam) {
                    return this.createFixture(command, homeTeam, awayTeam, league);
                  } else {
                    throw new TeamNotFound(command.away_team_api_id);
                  }
                });
              } else {
                throw new TeamNotFound(command.home_team_api_id);
              }
            });
          } else {
            throw new LeagueNotFound(command.league_api_id);
          }
        });
      }
    });
  }

  private async createFixture(command: CreateFixtureCommand, homeTeam: Team, awayTeam: Team, league: League) {
    const newFixture = Fixture.newFixture(
      command.api_foot_id,
      command.date,
      new FixtureTeam(homeTeam.id, command.home_team_goal),
      new FixtureTeam(awayTeam.id, command.away_team_goal),
      FixtureStatus[command.status],
      new FixtureLeague(league.id),
    );
    return this.fixtureRepository.createFixture(newFixture);
  }
}
