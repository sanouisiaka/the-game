import { store } from '@/store';
import { randomFixtures } from '../../../utils/utils';
import {
  getFixture,
  getFixtureReadableDate,
  getFixturesCurrentPage,
  getFixturesTotalPages,
  getNbrOfFixtures,
  isRetrievingPaginatedFixtures,
} from '@/corelogic/store/fixtures/fixtures.store';

const actualState = {
  pastFixtures: [],
  fixtures: randomFixtures,
  currentPage: 2,
  totalPage: 3,
  totalFixtures: 9,
  loading: true,
};
test('should return the number of fixtures', () => {
  // Given
  store.getState().fixtures = actualState;

  // Then
  expect(getNbrOfFixtures(store.getState())).toEqual(9);
});

test('should return current page', () => {
  // Given
  store.getState().fixtures = actualState;

  // Then
  expect(getFixturesCurrentPage(store.getState())).toEqual(2);
});

test('should return total number of page', () => {
  // Given
  store.getState().fixtures = actualState;

  // Then
  expect(getFixturesTotalPages(store.getState())).toEqual(3);
});

test('should return is retrieving is loading', () => {
  // Given
  store.getState().fixtures = actualState;

  // Then
  expect(isRetrievingPaginatedFixtures(store.getState())).toBeTruthy();
});

test('should return the fixture', () => {
  // Given
  store.getState().fixtures = actualState;

  // Then
  expect(getFixture('afeu-1553-77811')(store.getState())?.id).toBeDefined();
  expect(getFixture('1234')(store.getState())).toBeUndefined();
});

test('should return the fixture', () => {
  // Given
  store.getState().fixtures = {
    pastFixtures: randomFixtures,
    fixtures: [],
    currentPage: 2,
    totalPage: 3,
    totalFixtures: 9,
    loading: true,
  };

  // Then
  expect(getFixture('afeu-1553-77811')(store.getState())?.id).toBeDefined();
  expect(getFixture('1234')(store.getState())).toBeUndefined();
});


test('should return the formatted date', () => {
  // Given
  const date = '1996/07/04 21:30';

  // Then
  expect(getFixtureReadableDate('fr-FR', date)).toEqual('jeudi 4 juillet à 21:30');
});
