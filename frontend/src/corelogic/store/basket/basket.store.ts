import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { addBet } from '@/corelogic/store/basket/action/addBet';
import { removeBet } from '@/corelogic/store/basket/action/removeBet';
import { setBasketType } from '@/corelogic/store/basket/action/setBasketType';
import { addAmountToBet } from '@/corelogic/store/basket/action/addAmountToBet';
import { addParlayAmount } from '@/corelogic/store/basket/action/addParlayAmount';
import { submit } from '@/corelogic/store/basket/action/submit';

export enum BasketType {
  SINGLE, MULTIPLE
}

const initialState = {
  chosenBets: [] as Bet[],
  type: BasketType.MULTIPLE,
  submitting: false,
} as Basket;


export const submitBetsThunk = createAsyncThunk('/basket/submit',
  async () => submit(),
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBet,
    addAmountToBet,
    addParlayAmount,
    removeBet,
    setBasketType,
  },
  extraReducers(builder) {
    builder.addCase(submitBetsThunk.fulfilled, (state) => {
      state.chosenBets = [];
      state.type = BasketType.MULTIPLE;
      state.parlayAmount = 0;
      state.submitting = false;
    });
    builder.addCase(submitBetsThunk.rejected, (state) => {
      state.submitting = false;
    });
    builder.addCase(submitBetsThunk.pending, (state) => {
      state.submitting = true;
    });
  },
});

export const isBetsSubmitting = (state: RootState) => state.basket.submitting;

export const getBasketBets = (state: RootState) => state.basket.chosenBets;
export const getBasketType = (state: RootState) => state.basket.type;

export const getBasketParlayAmount = (state: RootState) => state.basket.parlayAmount;

export const getBet = (betId?: string) => (state: RootState) => state.basket.chosenBets.find(b => b.id === betId);


const DECIMAL = 2;

export const getBetsTotalAmount = (state: RootState) => {
  return state.basket.chosenBets
    .map(b => b.amount ? b.amount : 0)
    .reduce((res, current) => res + current, 0);
};

export const getBetPotential = (betId: string) => (state: RootState) => {
  const bet = state.basket.chosenBets.find(b => b.id === betId);

  if (bet) {
    return round(bet.amount ? bet.odd * bet.amount : 0);
  }

  return 0;
};

export const getTotalBetsPotential = (state: RootState) => {
  const totalPotential = state.basket.chosenBets
    .map(b => b.amount ? b.odd * b.amount : 0)
    .reduce((res, current) => res + current, 0);

  return round(totalPotential);
};

export const getParlayOdd = (state: RootState) => {
  const parlayTotalOdd = state.basket.chosenBets
    .map(b => b.odd)
    .reduce((res, current) => res * current, 1);

  return round(parlayTotalOdd);
};

export const getParlayPotential = (state: RootState) => {
  const parlayAmount = state.basket.parlayAmount;
  const totalOdd = state.basket.chosenBets
    .map(b => b.odd)
    .reduce((res, current) => res * current, 1);
  return round(parlayAmount ? totalOdd * parlayAmount : 0);

};

function round(value: number) {
  return parseFloat(value.toFixed(DECIMAL));
}


export interface Basket {
  chosenBets: Bet[],
  type: BasketType,
  parlayAmount: number,
  submitting: boolean,
}

export type Bet = {
  id: string,
  fixture: {
    id: string,
    leagueId: number,
    homeTeam: string,
    awayTeam: string,
  }
  selectedOption: 'HOME' | 'DRAW' | 'AWAY',
  odd: number,
  amount: number;
}




