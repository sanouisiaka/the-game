import { store } from '@/store';
import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config';
import { container } from '@/di';
import { HttpClientMocked } from '../../../../utils/mock.dependencies';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import {
  getFixture,
  getFixtures,
  getFixturesCurrentPage,
  getFixturesTotalPages,
  getNbrOfFixtures,
  isRetrievingPaginatedFixtures,
  retrievePaginatedFixturesThunk,
} from '@/corelogic/store/fixtures/fixtures.store';
import { GetPaginatedFixturesParam } from '@/corelogic/ports/fixture.repository.interface';
import { Page } from '@/corelogic/domain/page';


const httpMock = new HttpClientMocked();

const fixtures = [{
  id: 'afeu-1553-77811',
  leagueId: 21,
  date: '1996/07/04',
  status: 'OPEN',
  homeTeam: {
    id: 7,
    goal: 3,
    name: 'Paris Saint-Germain',
    code: 'PSG',
    logoUrl: 'https://url.com',
  },
  awayTeam: {
    id: 69,
    goal: 0,
    name: 'Olympique de Marseille',
    code: 'OM',
    logoUrl: 'https://url.com',
  },
  winnerBets: [
    {
      winOption: 'HOME',
      id: '2432',
      odd: 1.23,
    },
    {
      winOption: 'AWAY',
      id: '20032',
      odd: 14.23,
    }],
}] as Fixture[];

beforeEach(() => {
  container.register<HttpClient>(AXIOS_HTTP_CLIENT, { useValue: httpMock });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('should return the initial state', () => {
  // Given
  const currentState = getFixtures(store.getState());

  // Then
  expect(currentState.length).toEqual(0);
  expect(getNbrOfFixtures(store.getState())).toEqual(0);
  expect(getFixturesCurrentPage(store.getState())).toEqual(1);
  expect(getFixturesTotalPages(store.getState())).toEqual(1);
  expect(isRetrievingPaginatedFixtures(store.getState())).toBeFalsy();
});

test('should retrieve fixtures', async () => {
  // Given
  httpMock.get.mockResolvedValueOnce(
    { data: { elements: fixtures, currentPage: 2, totalPage: 4, totalCount: 9, response: [] } as Page<Fixture> },
  );

  // When
  await store.dispatch(retrievePaginatedFixturesThunk({ leagueId: 1, from: new Date(), size: 1, page: 1 } as GetPaginatedFixturesParam));

  // Then
  const fixturesResult = getFixtures(store.getState());

  expect(fixturesResult.length).toEqual(1);
  expect(fixturesResult).toEqual(fixtures);

  expect(getNbrOfFixtures(store.getState())).toEqual(9);
  expect(getFixturesCurrentPage(store.getState())).toEqual(2);
  expect(getFixturesTotalPages(store.getState())).toEqual(4);
  expect(isRetrievingPaginatedFixtures(store.getState())).toBeFalsy();
  expect(getFixture('afeu-1553-77811')).toBeDefined();
  expect(getFixture('1234')).toBeUndefined();


});


test('should reset fixtures if there is an error during retrieving fixtures', async () => {
  // Given
  httpMock.get.mockRejectedValue({ response: { status: 403 } });

  // When
  await store.dispatch(retrievePaginatedFixturesThunk({ leagueId: 1, from: new Date(), size: 1, page: 1 } as GetPaginatedFixturesParam));

  // Then
  const currentState = getFixtures(store.getState());

  expect(httpMock.get).toHaveBeenCalledTimes(1);
  expect(currentState.length).toEqual(0);
  expect(getNbrOfFixtures(store.getState())).toEqual(0);
  expect(getFixturesCurrentPage(store.getState())).toEqual(1);
  expect(getFixturesTotalPages(store.getState())).toEqual(1);
  expect(isRetrievingPaginatedFixtures(store.getState())).toBeFalsy();
});

