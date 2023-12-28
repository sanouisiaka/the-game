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
import { randomFixtures } from '../../../../utils/utils';


const httpMock = new HttpClientMocked();


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
    { data: { currentPage: 2, totalPage: 4, totalCount: 9, response: randomFixtures } as Page<Fixture> },
  );

  // When
  await store.dispatch(retrievePaginatedFixturesThunk({ leagueId: 1, from: new Date(), size: 1, page: 1 } as GetPaginatedFixturesParam));

  // Then
  const fixturesResult = getFixtures(store.getState());

  expect(fixturesResult.length).toEqual(2);
  expect(fixturesResult).toEqual(randomFixtures);

  expect(getNbrOfFixtures(store.getState())).toEqual(9);
  expect(getFixturesCurrentPage(store.getState())).toEqual(2);
  expect(getFixturesTotalPages(store.getState())).toEqual(4);
  expect(isRetrievingPaginatedFixtures(store.getState())).toBeFalsy();
  expect(getFixture('afeu-1553-77811')(store.getState())?.id).toBeDefined();
  expect(getFixture('1234')(store.getState())).toBeUndefined();


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

