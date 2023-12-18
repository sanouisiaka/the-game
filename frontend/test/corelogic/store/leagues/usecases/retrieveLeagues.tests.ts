import { store } from '@/store';
import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config';
import { container } from '@/di';
import { HttpClientMocked } from '../../../../utils/mock.dependencies';
import { League } from '@/corelogic/domain/league/league';
import { getLeague, getLeagues, retrieveLeaguesThunk } from '@/corelogic/store/leagues/leagues.store';


const httpMock = new HttpClientMocked();

const leagues = [
  { id: 1, name: 'Ligue 1', country: 'FR', logoUrl: 'https://logo.png' },
  { id: 2, name: 'Liga', country: 'ES', logoUrl: 'https://logo.png' },
] as League[];

beforeEach(() => {
  container.register<HttpClient>(AXIOS_HTTP_CLIENT, { useValue: httpMock });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('should return the initial state', () => {
  const currentState = getLeagues(store.getState());
  expect(currentState.length).toEqual(0);
});

test('should retrieve leagues', async () => {
  // Given
  httpMock.get.mockResolvedValueOnce({ data: leagues });

  // When
  await store.dispatch(retrieveLeaguesThunk());

  // Then
  const currentState = getLeagues(store.getState());

  expect(currentState.length).toEqual(2);
  expect(currentState).toEqual(leagues);

  expect(getLeague(1)).toBeDefined();
  expect(getLeague(2)).toBeDefined();
  expect(getLeague(3)).toBeUndefined();

});


test('should reset leagues if there is an error during retrieving leagues', async () => {
  // Given
  httpMock.get.mockRejectedValue({ response: { status: 403 } });

  // When
  await store.dispatch(retrieveLeaguesThunk());

  // Then
  const currentState = getLeagues(store.getState());

  expect(httpMock.get).toHaveBeenCalledTimes(1);
  expect(currentState.length).toEqual(0);
});

