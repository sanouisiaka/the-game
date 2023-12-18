import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { GetPaginatedFixturesParam } from '@/corelogic/ports/fixture.repository.interface';
import { retrievePaginatedFixtures } from '@/corelogic/store/fixtures/usecases/retrieveFixtures';


const initialState = {
  fixtures: [] as Fixture[],
  currentPage: 1,
  totalPage: 1,
  totalFixtures: 0,
  loading: false,
};

export const retrievePaginatedFixturesThunk = createAsyncThunk('/fixtures/retrievePaginatedFixtures',
  async (params: GetPaginatedFixturesParam) => retrievePaginatedFixtures(params.leagueId, params.from, params.page, params.size),
);


export const fixturesSlice = createSlice({
  name: 'fixtures',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(retrievePaginatedFixturesThunk.fulfilled, (state, action) => {
      state.fixtures = action.payload.response;
      state.totalFixtures = action.payload.totalCount;
      state.totalPage = action.payload.totalPage;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    });

    builder.addCase(retrievePaginatedFixturesThunk.rejected, (state) => {
      state.fixtures = [];
      state.currentPage = 1;
      state.totalPage = 1;
      state.totalFixtures = 0;
      state.loading = false;
    });

    builder.addCase(retrievePaginatedFixturesThunk.pending, (state) => {
      state.loading = true;
    });
  },
});

export default fixturesSlice.reducer;

export const getFixtures = (state: RootState) => state.fixtures.fixtures;

export const getNbrOfFixtures = (state: RootState) => state.fixtures.totalFixtures;

export const getFixturesCurrentPage = (state: RootState) => state.fixtures.currentPage;

export const getFixturesTotalPages = (state: RootState) => state.fixtures.totalPage;

export const isRetrievingPaginatedFixtures = (state: RootState) => state.fixtures.loading;

export const getFixture = (fixtureId: string) => (state: RootState) => state.fixtures.fixtures.find(f => f.id === fixtureId);




