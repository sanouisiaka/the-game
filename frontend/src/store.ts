import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/corelogic/store/user/user.store';
import { leaguesSlice } from '@/corelogic/store/leagues/leagues.store';
import { fixturesSlice } from '@/corelogic/store/fixtures/fixtures.store';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    leagues: leaguesSlice.reducer,
    fixtures: fixturesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch