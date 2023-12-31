import { store } from '@/store';
import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config';
import { container } from '@/di';
import { HttpClientMocked } from '../../../../utils/mock.dependencies';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { retrievePaginatedIncomingFixturesThunk, retrievePastFixturesThunk } from '@/corelogic/store/fixtures/fixtures.store';
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
  const storeState = store.getState().fixtures;

  // Then
  expect(storeState.fixtures.length).toEqual(0);
  expect(storeState.totalFixtures).toEqual(0);
  expect(storeState.currentPage).toEqual(1);
  expect(storeState.totalPage).toEqual(1);
  expect(storeState.loading).toBeFalsy();
});

test('should retrieve fixtures', async () => {
  // Given
  httpMock.get.mockResolvedValueOnce(
    { data: { currentPage: 2, totalPage: 4, totalCount: 9, response: randomFixtures } as Page<Fixture> },
  );

  // When
  await store.dispatch(retrievePaginatedIncomingFixturesThunk({ leagueId: 1, size: 1, page: 1 } as GetPaginatedFixturesParam));

  // Then
  const storeState = store.getState().fixtures;

  expect(storeState.fixtures.length).toEqual(2);
  expect(storeState.fixtures).toEqual(randomFixtures);
  expect(storeState.totalFixtures).toEqual(9);
  expect(storeState.currentPage).toEqual(2);
  expect(storeState.totalPage).toEqual(4);
  expect(storeState.loading).toBeFalsy();

});

test('should retrieve past fixtures', async () => {
  // Given
  httpMock.get.mockResolvedValueOnce(
    { data: { currentPage: 2, totalPage: 4, totalCount: 9, response: randomFixtures } as Page<Fixture> },
  );

  // When
  await store.dispatch(retrievePastFixturesThunk());

  // Then
  const fixturesResult = store.getState().fixtures.pastFixtures;

  expect(fixturesResult.length).toEqual(2);
  expect(fixturesResult).toEqual(randomFixtures);


});


test('should reset fixtures if there is an error during retrieving fixtures', async () => {
  // Given
  httpMock.get.mockRejectedValue({ response: { status: 403 } });

  // When
  await store.dispatch(retrievePaginatedIncomingFixturesThunk({ leagueId: 1, from: new Date(), size: 1, page: 1 } as GetPaginatedFixturesParam));

  // Then
  const storeState = store.getState().fixtures;

  expect(httpMock.get).toHaveBeenCalledTimes(1);
  expect(storeState.fixtures.length).toEqual(0);
  expect(storeState.totalFixtures).toEqual(0);
  expect(storeState.currentPage).toEqual(1);
  expect(storeState.totalPage).toEqual(1);
  expect(storeState.loading).toBeFalsy();
});

