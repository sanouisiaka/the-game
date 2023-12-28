import { Basket, BasketType } from '@/corelogic/store/basket/basket.store';
import { PayloadAction } from '@reduxjs/toolkit';

export function setBasketType(state: Basket, action: PayloadAction<BasketType>) {
  state.type = action.payload;
}