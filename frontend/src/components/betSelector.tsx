import { useAppDispatch, useAppSelector } from '@/hooks';
import { useState } from 'react';
import { getLeagues } from '@/corelogic/store/leagues/leagues.store';
import {
  getFixtures,
  isRetrievingPaginatedFixtures,
  retrievePaginatedIncomingFixturesThunk,
} from '@/corelogic/store/fixtures/fixtures.store';
import LoadingSpinnerSvg from '@/components/elements/svg/loadingSpinnerSvg';
import FixtureOdd from '@/components/elements/fixtureOdd';
import { useTranslation } from '@/i18n/client';

export default function BetSelector() {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const leagues = useAppSelector(getLeagues);

  const fixtures = useAppSelector(getFixtures);
  const loading = useAppSelector(isRetrievingPaginatedFixtures);

  const [selectedLeagueId, selectLeague] = useState(-1);

  const initState = selectedLeagueId === -1;

  function handleLeagueClick(league: number) {
    selectLeague(league);
    dispatch(retrievePaginatedIncomingFixturesThunk({ page: 0, leagueId: league, size: 15 }));
  }


  const leaguesList = leagues.map(league =>
    <button key={league.id} onClick={() => handleLeagueClick(league.id)}
            className={
              `mx-6 my-1 text-sm text-white font-semibold rounded-full px-2 py-1 md:mx-2 md:my-0
              ${selectedLeagueId === league.id ? 'bg-sunset-600 border border-sunset-900' : 'bg-sunset-200'} hover:bg-sunset-400`
            }>
      {league.name}
    </button>,
  );

  const fixturesList = fixtures.map(fixture =>
    <div key={fixture.id} className='my-2'><FixtureOdd id={fixture.id} /></div>,
  );

  return (
    <div className='h-full flex flex-col md:p-4'>
      <div
        className='overflow-x-auto flex-none flex flex-col md:flex-row items-stretch whitespace-nowrap justify-between mx-5'>
        {leaguesList}
      </div>

      {leagues.length > 0 &&
        <div className='grow overflow-y-auto m-2'>
          {initState &&
            <div className='font-semibold text-neutral-950 text-center flex align-middle justify-center uppercase h-full items-center'>
              {t('bet.selectLeagueToStart')}
            </div>
          }
          {
            loading ? <div className='h-full flex'>
                <div className='m-auto h-8 w-8'><LoadingSpinnerSvg /></div>
              </div>
              : fixturesList
          }
        </div>
      }

    </div>
  );
}