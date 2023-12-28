import { PayloadAction } from '@reduxjs/toolkit';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { Basket, Bet } from '@/corelogic/store/basket/basket.store';

export function addBet(state: Basket, action: PayloadAction<{ fixture: Fixture, betId: string }>) {
  const fixture = action.payload.fixture;
  const betId = action.payload.betId;

  const chosenBet = fixture.winnerBets.find(wb => wb.id === betId);
  if (chosenBet) {
    state.chosenBets.push({
      id: chosenBet.id,
      fixture: {
        id: fixture.id,
        leagueId: fixture.leagueId,
        homeTeam: fixture.homeTeam.name,
        awayTeam: fixture.awayTeam.name,
      },
      selectedOption: chosenBet.winOption,
      odd: chosenBet.odd,
    } as Bet);
  }
}
