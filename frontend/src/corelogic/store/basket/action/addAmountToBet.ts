import { PayloadAction } from '@reduxjs/toolkit';
import { Basket } from '@/corelogic/store/basket/basket.store';

export function addAmountToBet(state: Basket, action: PayloadAction<{ betId?: string, amount: number }>) {
  const chosenBet = state.chosenBets.find(b => b.id === action.payload.betId);

  if (chosenBet) {
    chosenBet.amount = action.payload.amount;
  } else {
    state.parlayAmount = action.payload.amount;
  }
}
