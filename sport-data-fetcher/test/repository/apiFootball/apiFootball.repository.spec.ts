import { ApiFootballRepository } from '../../../src/repository/apiFootball/apiFootball.repository';
import mockAxios from '../../__mocks__/axios';
import {
  apiErrorResponse,
  apiFootballFixturesResponse,
  apiFootballOddsResponse,
  apiFootballPaginatedResponse,
  apiFootballTeamsResponse,
} from '../../utils';
import { BetType, FixtureStatus, League } from '../../../src/app/domain/football';
import { ApiResponseNotFound } from '../../../src/app/domain/errors/apirequest.error';
import { Bookmaker } from '../../../src/external/api-football/apiFootball';

jest.mock('axios');

describe('api football repository tests', () => {
  const apiFootballRepository = new ApiFootballRepository();

  it('should return fixtures list from apiFootball response', async () => {
    mockAxios.request.mockImplementationOnce(() => Promise.resolve({ data: apiFootballFixturesResponse }));
    const fixtures = await apiFootballRepository.getIncomingFixtures(League.LIGUE1);

    expect(fixtures.length).toEqual(1);
    expect(fixtures[0].api_foot_id).toEqual(apiFootballFixturesResponse.response[0].fixture.id);
    expect(fixtures[0].home_team_id).toEqual(apiFootballFixturesResponse.response[0].teams.home.id);
    expect(fixtures[0].away_team_id).toEqual(apiFootballFixturesResponse.response[0].teams.away.id);
    expect(fixtures[0].date).toEqual(new Date(apiFootballFixturesResponse.response[0].fixture.date));
    expect(fixtures[0].home_team_goal).toEqual(apiFootballFixturesResponse.response[0].goals.home);
    expect(fixtures[0].away_team_goal).toEqual(apiFootballFixturesResponse.response[0].goals.away);
    expect(fixtures[0].status).toEqual(FixtureStatus.CLOSE);
    expect(fixtures[0].api_foot_league_id).toEqual(apiFootballFixturesResponse.response[0].league.id);
  });

  it('should return teams list from apiFootball response', async () => {
    mockAxios.request.mockImplementationOnce(() => Promise.resolve({ data: apiFootballTeamsResponse }));
    const teams = await apiFootballRepository.getTeams(League.LIGUE1, 2023);

    expect(teams.length).toBe(2);
    expect(teams[0].api_foot_id).toEqual(apiFootballTeamsResponse.response[0].team.id);
    expect(teams[0].code).toEqual(apiFootballTeamsResponse.response[0].team.code);
    expect(teams[0].logo).toEqual(apiFootballTeamsResponse.response[0].team.logo);
    expect(teams[0].name).toEqual(apiFootballTeamsResponse.response[0].team.name);
  });

  it('should return bets from apiFootball response', async () => {
    mockAxios.request.mockImplementationOnce(() => Promise.resolve({ data: apiFootballOddsResponse }));
    const bets = await apiFootballRepository.getOdds(League.LIGUE1, 2023, Bookmaker.UNIBET, 1);

    expect(bets.length).toBe(3);
    bets.forEach((bet) => expect(bet.type).toEqual(BetType.WINNER));
    expect(bets[0].api_foot_fixture_id).toEqual(apiFootballOddsResponse.response[0].fixture.id);

    bets[0].options.forEach((option, i) => {
      expect(option.value).toEqual(apiFootballOddsResponse.response[0].bookmakers[0].bets[0].values[i].value);
      expect(option.odd).toEqual(parseFloat(apiFootballOddsResponse.response[0].bookmakers[0].bets[0].values[i].odd));
    });
  });

  it('should call api multiple times if paginated', async () => {
    mockAxios.request.mockImplementationOnce(() => Promise.resolve(apiFootballPaginatedResponse(1, 3)));
    mockAxios.request.mockImplementationOnce(() => Promise.resolve(apiFootballPaginatedResponse(2, 3)));
    mockAxios.request.mockImplementationOnce(() => Promise.resolve(apiFootballPaginatedResponse(3, 3)));

    await apiFootballRepository.getOdds(League.LIGUE1, 2023, Bookmaker.UNIBET, 1);

    expect(mockAxios.request).toHaveBeenCalledTimes(3);
  });

  it('should reject if apiFootball returns a error', async () => {
    mockAxios.request.mockImplementation(() => Promise.resolve({ data: apiErrorResponse }));
    await expect(apiFootballRepository.getIncomingFixtures(League.LIGUE1)).rejects.toEqual(apiErrorResponse.errors);
    await expect(apiFootballRepository.getTeams(League.LIGUE1, 2023)).rejects.toEqual(apiErrorResponse.errors);
    await expect(apiFootballRepository.getOdds(League.LIGUE1, 2023, Bookmaker.UNIBET, 1)).rejects.toEqual(apiErrorResponse.errors);
  });

  it('should reject if apiFootball is not available', async () => {
    mockAxios.request.mockImplementation(() => Promise.reject({}));
    await expect(apiFootballRepository.getIncomingFixtures(League.LIGUE1)).rejects.toEqual({});
    await expect(apiFootballRepository.getTeams(League.LIGUE1, 2023)).rejects.toEqual({});
    await expect(apiFootballRepository.getOdds(League.LIGUE1, 2023, Bookmaker.UNIBET, 1)).rejects.toEqual({});
  });

  it('should reject if apiFootball returns no response', async () => {
    mockAxios.request.mockImplementation(() => Promise.resolve({ data: {} }));
    await expect(apiFootballRepository.getIncomingFixtures(League.LIGUE1)).rejects.toEqual(new ApiResponseNotFound());
    await expect(apiFootballRepository.getTeams(League.LIGUE1, 2023)).rejects.toEqual(new ApiResponseNotFound());
    await expect(apiFootballRepository.getOdds(League.LIGUE1, 2023, Bookmaker.UNIBET, 1)).rejects.toEqual(new ApiResponseNotFound());
  });
});
