import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { GetPaginatedFixturesParam } from '@/corelogic/ports/fixture.repository.interface';
import { retrievePaginatedIncomingFixtures, retrievePaginatedPastFixtures } from '@/corelogic/store/fixtures/action/retrieveFixtures';


const initialState = {
  pastFixtures: [] as Fixture[],
  fixtures: [] as Fixture[],
  currentPage: 1,
  totalPage: 1,
  totalFixtures: 0,
  loading: false,
};

export const retrievePaginatedIncomingFixturesThunk = createAsyncThunk('/fixtures/retrievePaginatedFixtures',
  async (params: GetPaginatedFixturesParam) => retrievePaginatedIncomingFixtures(params.leagueId, params.page, params.size),
);

export const retrievePastFixturesThunk = createAsyncThunk('/fixtures/retrievePastFixtures',
  async () => retrievePaginatedPastFixtures(0, 5),
);


export const fixturesSlice = createSlice({
  name: 'fixtures',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(retrievePaginatedIncomingFixturesThunk.fulfilled, (state, action) => {
      state.fixtures = action.payload.response;
      state.totalFixtures = action.payload.totalCount;
      state.totalPage = action.payload.totalPage;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    });

    builder.addCase(retrievePaginatedIncomingFixturesThunk.rejected, (state) => {
      state.fixtures = [];
      state.currentPage = 1;
      state.totalPage = 1;
      state.totalFixtures = 0;
      state.loading = false;
    });

    builder.addCase(retrievePaginatedIncomingFixturesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(retrievePastFixturesThunk.fulfilled, (state, action) => {
      state.pastFixtures = action.payload.response;
    });
  },
});

export default fixturesSlice.reducer;

export const getPastFixtures = (state: RootState) => state.fixtures.pastFixtures;

export const getFixtures = (state: RootState) => state.fixtures.fixtures;

export const getNbrOfFixtures = (state: RootState) => state.fixtures.totalFixtures;

export const getFixturesCurrentPage = (state: RootState) => state.fixtures.currentPage;

export const getFixturesTotalPages = (state: RootState) => state.fixtures.totalPage;

export const isRetrievingPaginatedFixtures = (state: RootState) => state.fixtures.loading;

export const getFixture = (fixtureId: string) => (state: RootState) => {
  const fixture = state.fixtures.fixtures.find(f => f.id === fixtureId);
  if (!fixture) {
    return state.fixtures.pastFixtures.find(f => f.id === fixtureId);
  }
  return fixture;
};

export const getFixtureReadableDate = (lang: string | undefined, date: string) => new Date(date).toLocaleTimeString(lang,
  {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });




