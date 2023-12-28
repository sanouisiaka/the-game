import { PayloadAction } from '@reduxjs/toolkit';
import { Basket } from '@/corelogic/store/basket/basket.store';

export function addParlayAmount(state: Basket, action: PayloadAction<number>) {
  state.parlayAmount = action.payload;
}
