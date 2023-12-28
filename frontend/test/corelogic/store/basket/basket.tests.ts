import {
  basketSlice,
  BasketType,
  getBasketBets,
  getBasketParlayAmount,
  getBasketType,
  getBet,
  getBetPotential,
  getBetsTotalAmount,
  getParlayOdd,
  getParlayPotential,
  getTotalBetsPotential,
} from '@/corelogic/store/basket/basket.store';
import { store } from '@/store';
import { randomFixtures } from '../../../utils/utils';

beforeEach(() => {
  resetBasketStore();
});

test('should return the initial state', () => {
  // Given
  const initialState = basketSlice.getInitialState();

  // Then
  expect(initialState.chosenBets.length).toEqual(0);
  expect(initialState.type).toEqual(BasketType.MULTIPLE);
  expect(initialState.parlayAmount).toEqual(undefined);
});

test('should add bet', () => {
  // Given
  const fixture = randomFixtures[0];

  // When
  store.dispatch(basketSlice.actions.addBet({ fixture: fixture, betId: fixture.winnerBets[0].id }));

  // Then
  const basketState = store.getState().basket;
  expect(basketState.chosenBets.length).toEqual(1);
  expect(basketState.chosenBets[0].id).toEqual(fixture.winnerBets[0].id);
  expect(basketState.chosenBets[0].fixture.id).toEqual(fixture.id);
  expect(basketState.chosenBets[0].odd).toEqual(fixture.winnerBets[0].odd);
  expect(basketState.chosenBets[0].amount).toEqual(undefined);
  expect(basketState.chosenBets[0].selectedOption).toEqual(fixture.winnerBets[0].winOption);
});


test('should add an amount to the bet', () => {
  // Given
  store.dispatch(basketSlice.actions.addBet({ fixture: randomFixtures[0], betId: randomFixtures[0].winnerBets[0].id }));
  store.dispatch(basketSlice.actions.addBet({ fixture: randomFixtures[1], betId: randomFixtures[1].winnerBets[0].id }));

  // When
  const amount = 12;
  const betToAddAmountTo = randomFixtures[0].winnerBets[0].id;
  store.dispatch(basketSlice.actions.addAmountToBet({ betId: betToAddAmountTo, amount }));

  // Then
  const basketState = store.getState().basket;
  expect(basketState.chosenBets.find(b => b.id === betToAddAmountTo)?.amount).toEqual(amount);
  expect(basketState.chosenBets.find(b => b.id === randomFixtures[1].winnerBets[0].id)?.amount).toEqual(undefined);
  expect(basketState.parlayAmount).toEqual(undefined);
});

test('should add an amount to parlay', () => {
  // When
  const amount = 12;
  store.dispatch(basketSlice.actions.addParlayAmount(amount));

  // Then
  const basketState = store.getState().basket;
  expect(basketState.parlayAmount).toEqual(amount);
});

test('should remove bet', () => {
  // Given
  store.dispatch(basketSlice.actions.addBet({ fixture: randomFixtures[0], betId: randomFixtures[0].winnerBets[0].id }));
  store.dispatch(basketSlice.actions.addBet({ fixture: randomFixtures[1], betId: randomFixtures[1].winnerBets[0].id }));

  // When
  const betToRemove = randomFixtures[0].winnerBets[0].id;
  store.dispatch(basketSlice.actions.removeBet(betToRemove));

  // Then
  const basketState = store.getState().basket;
  expect(basketState.chosenBets.length).toEqual(1);
  expect(basketState.chosenBets[0].id).not.toEqual(betToRemove);

});

test('should set betting type', () => {

  // When + Then
  store.dispatch(basketSlice.actions.setBasketType(BasketType.SINGLE));
  expect(store.getState().basket.type).toEqual(BasketType.SINGLE);

  store.dispatch(basketSlice.actions.setBasketType(BasketType.MULTIPLE));
  expect(store.getState().basket.type).toEqual(BasketType.MULTIPLE);

});


test('should get added bets', () => {
  // Given
  const fixture = randomFixtures[0];
  store.dispatch(basketSlice.actions.addBet({ fixture: fixture, betId: fixture.winnerBets[0].id }));

  // When
  const basketBets = getBasketBets(store.getState());


  // Then
  expect(basketBets.length).toEqual(1);
  expect(basketBets[0].id).toEqual(fixture.winnerBets[0].id);
  expect(basketBets[0].fixture.id).toEqual(fixture.id);
  expect(basketBets[0].fixture.leagueId).toEqual(fixture.leagueId);
  expect(basketBets[0].fixture.homeTeam).toEqual(fixture.homeTeam.name);
  expect(basketBets[0].fixture.awayTeam).toEqual(fixture.awayTeam.name);
  expect(basketBets[0].odd).toEqual(fixture.winnerBets[0].odd);
  expect(basketBets[0].amount).toEqual(undefined);
  expect(basketBets[0].selectedOption).toEqual(fixture.winnerBets[0].winOption);
});


test('should get betting type', () => {
  // Given
  store.dispatch(basketSlice.actions.setBasketType(BasketType.SINGLE));

  // When
  const bettingType = getBasketType(store.getState());

  // Then
  expect(bettingType).toEqual(BasketType.SINGLE);

});

test('should get basket parlay total bet amount', () => {
  // Given
  const amount = 12;
  store.dispatch(basketSlice.actions.addAmountToBet({ amount }));

  // When
  const totalBet = getBasketParlayAmount(store.getState());

  // Then
  expect(totalBet).toEqual(amount);

});

test('should return bet', () => {
  // Given
  addRandomBet();

  // When
  const betId = randomFixtures[0].winnerBets[0].id;
  const bet = getBet(betId)(store.getState());

  expect(bet).not.toBeUndefined();
  expect(bet?.id).toEqual(betId);
  expect(getBet('randomId')(store.getState())).toBeUndefined();
});

test('should get basket total bet amount', () => {
  addRandomBet();
  store.dispatch(basketSlice.actions.addAmountToBet({ betId: randomFixtures[0].winnerBets[0].id, amount: 12.5 }));

  // When
  let totalBet = getBetsTotalAmount(store.getState());

  // Then
  expect(totalBet).toEqual(12.5);

  store.dispatch(basketSlice.actions.addAmountToBet({ betId: randomFixtures[1].winnerBets[0].id, amount: 9 }));

  // When
  totalBet = getBetsTotalAmount(store.getState());

  // Then
  expect(totalBet).toEqual(21.5);

});

test('should get bet total potential win', () => {
  addRandomBet();
  const betId = randomFixtures[0].winnerBets[0].id;
  store.dispatch(basketSlice.actions.addAmountToBet({ betId: betId, amount: 12.5 }));

  // When
  let totalBet = getBetPotential(betId)(store.getState());

  // Then
  expect(totalBet).toEqual(15.38);

});

test('should get bets total potential win', () => {
  addRandomBet();
  store.dispatch(basketSlice.actions.addAmountToBet({ betId: randomFixtures[0].winnerBets[0].id, amount: 12.5 }));

  // When
  let totalBet = getTotalBetsPotential(store.getState());

  // Then
  expect(totalBet).toEqual(15.38);

  store.dispatch(basketSlice.actions.addAmountToBet({ betId: randomFixtures[1].winnerBets[0].id, amount: 9 }));

  // When
  totalBet = getTotalBetsPotential(store.getState());

  // Then
  expect(totalBet).toEqual(29.51);

});


test('should get parlay odd', () => {
  addRandomBet();

  // When
  let parlayOdd = getParlayOdd(store.getState());

  // Then
  expect(parlayOdd).toEqual(1.93);

});

test('should get parlay potential win', () => {
  addRandomBet();
  store.dispatch(basketSlice.actions.addParlayAmount(20));

  // When
  let parlayOdd = getParlayPotential(store.getState());

  // Then
  expect(parlayOdd).toEqual(38.62);

});


function addRandomBet() {
  store.dispatch(basketSlice.actions.addBet({ fixture: randomFixtures[0], betId: randomFixtures[0].winnerBets[0].id }));
  store.dispatch(basketSlice.actions.addBet({ fixture: randomFixtures[1], betId: randomFixtures[1].winnerBets[0].id }));

}

function resetBasketStore() {
  getBasketBets(store.getState()).forEach(b => {
    store.dispatch(basketSlice.actions.removeBet(b.id));
  });
}
