import { Basket } from '@/corelogic/store/basket/basket.store';
import { PayloadAction } from '@reduxjs/toolkit';

export function removeBet(state: Basket, action: PayloadAction<string>) {
  const index = state.chosenBets.findIndex(b => b.id === action.payload);
  state.chosenBets.splice(index, 1);
}