import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { League } from '@/corelogic/domain/league/league';
import { retrieveLeagues } from '@/corelogic/store/leagues/action/retrieveLeagues';


const initialState = {
  leagues: [] as League[],
};

export const retrieveLeaguesThunk = createAsyncThunk<League[]>('/leagues/retrieveLeagues', retrieveLeagues);

export const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(retrieveLeaguesThunk.fulfilled, (state, action) => {
      state.leagues = action.payload;
    });

    builder.addCase(retrieveLeaguesThunk.rejected, (state) => {
      state.leagues = [];
    });
  },
});

export default leaguesSlice.reducer;

export const getLeagues = (state: RootState) => state.leagues.leagues;

export const getLeague = (leagueId: number | undefined) => (state: RootState) => state.leagues.leagues.find(l => l.id === leagueId);

