import { CreateFixtureCommand } from './createFixtureCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { EventStatus } from '../../../domain/event/event.status';
import { Fixture } from '../../../domain/event/fixture/fixture';
import { FixtureTeam } from '../../../domain/event/fixture/fixtureTeam';
import { EventLeague } from '../../../domain/event/eventLeague';
import { ITeamRepository } from '../../../ports/team.repository.interface';
import { TeamNotFound } from '../../../domain/team/error/teamNotFound.error';
import { FixtureAlreadyExists } from '../../../domain/event/fixture/error/fixtureAlreadyExists.error';
import { CannotPlayAgainstHimself } from '../../../domain/event/fixture/error/CannotPlayAgainstHimself.error';
import { ILeagueRepository } from '../../../ports/league.repository.interface';
import { LeagueNotFound } from '../../../domain/league/error/leagueNotFound.error';
import { League } from '../../../domain/league/league';
import { Team } from '../../../domain/team/team';

@CommandHandler(CreateFixtureCommand)
export class CreateFixtureCommandHandler implements ICommandHandler<CreateFixtureCommand, string> {
  constructor(
    @Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository,
    @Inject(ITeamRepository) private readonly teamRepository: ITeamRepository,
    @Inject(ILeagueRepository) private readonly leagueRepository: ILeagueRepository,
  ) {}

  private readonly logger = new Logger(CreateFixtureCommandHandler.name);

  async execute(command: CreateFixtureCommand): Promise<string> {
    this.logger.log('creating fixture with api_foot_d: ' + command.api_foot_id);
    if (command.home_team_api_id === command.away_team_api_id) {
      throw new CannotPlayAgainstHimself();
    }
    return this.fixtureRepository.getIdByApiFootId(command.api_foot_id).then((fixtureId) => {
      if (fixtureId) {
        throw new FixtureAlreadyExists(fixtureId);
      } else {
        return this.leagueRepository.getLeagueByApiFootId(command.league_api_id).then((league) => {
          if (league) {
            return this.teamRepository
              .getTeamByApiFootId(command.home_team_api_id)
              .then((homeTeam) => {
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
              })
              .then((id) => {
                this.logger.log('fixture with id ' + id + ' created');
                return id;
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
      EventStatus[command.status],
      new EventLeague(league.id),
    );
    return this.fixtureRepository.createFixture(newFixture);
  }
}
