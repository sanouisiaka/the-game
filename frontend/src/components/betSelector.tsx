import { useAppDispatch, useAppSelector } from '@/hooks';
import { useState } from 'react';
import { getLeagues } from '@/corelogic/store/leagues/leagues.store';
import { getFixtures, isRetrievingPaginatedFixtures, retrievePaginatedFixturesThunk } from '@/corelogic/store/fixtures/fixtures.store';
import Fixture from '@/components/elements/fixture';

export default function BetSelector() {


  const dispatch = useAppDispatch();

  const leagues = useAppSelector(getLeagues);

  const fixtures = useAppSelector(getFixtures);
  const loading = useAppSelector(isRetrievingPaginatedFixtures);

  const [selectedLeagueId, selectLeague] = useState(-1);

  function handleLeagueClick(league: number) {
    selectLeague(league);
    dispatch(retrievePaginatedFixturesThunk({ page: 0, leagueId: league, from: new Date(), size: 15 }));
  }


  const leaguesList = leagues.map(league =>
    <button key={league.id} onClick={() => handleLeagueClick(league.id)}
            className={
              `text-sm text-white font-semibold rounded-full px-2 py-1 mx-2
              ${selectedLeagueId === league.id ? 'bg-sunset-600 border border-sunset-900' : 'bg-sunset-200'} hover:bg-sunset-400`
            }>
      {league.name}
    </button>,
  );

  const fixturesList = fixtures.map(fixture =>
    <div key={fixture.id} className='my-2'><Fixture id={fixture.id} /></div>,
  );

  return (
    <div className='h-full flex flex-col p-4'>
      <div
        className='overflow-x-auto flex-none flex flex-col md:flex-row items-stretch whitespace-nowrap justify-between mx-5'>{leaguesList}</div>

      {
        loading ? <div>charge</div>
          : <div className='grow overflow-y-auto m-2'>{fixturesList}</div>
      }
    </div>
  );
}