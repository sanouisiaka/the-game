import { Bet, BetType, Fixture, FixtureStatus, Team } from '../../app/domain/football';
import { TeamData } from '../../external/api-football/apiFootball';

export class ApiFootballMapper {
  fixturesDataToDomain(fixturesData: any[]): Fixture[] {
    return fixturesData.map((data) => {
      return {
        api_foot_id: data.fixture.id as number,
        home_team_id: data.teams.home.id as number,
        away_team_id: data.teams.away.id as number,
        date: new Date(data.fixture.date),
        home_team_goal: data.goals.home as number,
        away_team_goal: data.goals.away as number,
        status: this.convertToFixtureStatus(data.fixture.status.short),
        api_foot_league_id: data.league.id as number,
      } as Fixture;
    });
  }

  teamsDataToDomain(teamsData: TeamData[]): Team[] {
    return teamsData.map((data) => {
      return {
        api_foot_id: data.team.id,
        name: data.team.name,
        code: data.team.code,
        logo: data.team.logo,
      } as Team;
    });
  }

  oddsDataToDomain(oddsData: any[]): Bet[] {
    return oddsData.flatMap((data) => {
      const fixtureId = parseInt(data.fixture.id);
      // we are taking only the first bookmakers odd for now
      return data.bookmakers[0].bets.map((bet) => {
        return {
          type: this.getBetType(bet.id),
          api_foot_fixture_id: fixtureId,
          options: bet.values.map((v) => {
            return { value: v.value, odd: parseFloat(v.odd) };
          }),
        } as Bet;
      }) as Bet[];
    });
  }

  private convertToFixtureStatus(matchStatus: string) {
    if (matchStatus === 'FT') {
      return FixtureStatus.CLOSE;
    } else if (matchStatus === 'LIVE') {
      return FixtureStatus.ONGOING;
    } else {
      return FixtureStatus.OPEN;
    }
  }

  private getBetType(type: number): BetType {
    switch (type) {
      case 1:
        return BetType.WINNER;
      default:
        return null;
    }
  }
}
