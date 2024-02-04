import { getConnectedUser, retrieveConnectedUserStatus, retrieveUserThunk } from '@/corelogic/store/user/user.store'
import { User } from '@/corelogic/domain/user/user'
import { store } from '@/store'
import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config'
import { container } from '@/di'
import { HttpClientMocked } from '../../../../utils/mock.dependencies'
import { Status } from '@/types/fetch.types'


const httpMock = new HttpClientMocked();

const will = { id: '1', email: 'william@gmail.com', name: 'will iam' } as User;

beforeEach(() => {
  container.register<HttpClient>(AXIOS_HTTP_CLIENT, { useValue: httpMock });
})

afterEach(() => {
  jest.clearAllMocks();
})

test('should return the initial state', () => {
  const currentState = getConnectedUser(store.getState());
  const userStatus = retrieveConnectedUserStatus(store.getState());
  expect(currentState.id).not.toBeDefined();
  expect(userStatus).toEqual(Status.IDLE);
});

test('should retrieve current connected user if he exists', async () => {
  // Given
  httpMock.get.mockResolvedValueOnce({ data: will });

  // When
  await store.dispatch(retrieveUserThunk());

  // Then
  const currentState = getConnectedUser(store.getState());
  const userStatus = retrieveConnectedUserStatus(store.getState());

  expect(currentState.id).toEqual(will.id);
  expect(currentState.name).toEqual(will.name);
  expect(currentState.email).toEqual(will.email);

  expect(userStatus).toEqual(Status.SUCCEEDED);
})

test('should create current connected user if does not exist yet', async () => {
  // Given
  httpMock.get.mockRejectedValue({ response: { status: 404 } });
  httpMock.post.mockResolvedValue({ data: will });

  // When
  await store.dispatch(retrieveUserThunk({ name: 'John Doe'}));

  // Then
  const currentState = getConnectedUser(store.getState());
  const userStatus = retrieveConnectedUserStatus(store.getState());

  expect(httpMock.get).toHaveBeenCalledTimes(1);
  expect(httpMock.post).toHaveBeenNthCalledWith(1, '/users', {name: 'John Doe'});

  expect(currentState.id).toEqual(will.id);
  expect(currentState.email).toEqual(will.email);

  expect(userStatus).toEqual(Status.SUCCEEDED);
})

test('should set fail status if there is an error during retrieving connected user', async () => {
  // Given
  httpMock.get.mockRejectedValue({ response: { status: 403 } });

  // When
  await store.dispatch(retrieveUserThunk());

  // Then
  const userStatus = retrieveConnectedUserStatus(store.getState());

  expect(httpMock.get).toHaveBeenCalledTimes(1);
  expect(userStatus).toEqual(Status.FAILED);
})

test('should set fail status if there is an error during creating user', async () => {
  // Given
  httpMock.get.mockRejectedValue({ response: { status: 404 } });
  httpMock.post.mockRejectedValue({ response: { status: 500 } });


  // When
  await store.dispatch(retrieveUserThunk());

  // Then
  const userStatus = retrieveConnectedUserStatus(store.getState());

  expect(httpMock.get).toHaveBeenCalledTimes(1);
  expect(httpMock.post).toHaveBeenCalledTimes(1);
  expect(userStatus).toEqual(Status.FAILED);
})
