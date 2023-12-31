import { useAppSelector } from '@/hooks';
import { getLeague } from '@/corelogic/store/leagues/leagues.store';
import React from 'react';
import { getFixture, getFixtureReadableDate } from '@/corelogic/store/fixtures/fixtures.store';
import { useTranslation } from '@/i18n/client';
import { getWinnerId } from '@/corelogic/domain/fixture/fixture';

export default function FixtureInfo(props: { id: string }) {

  const { i18n, t } = useTranslation();

  const fixture = useAppSelector(getFixture(props.id));
  const league = useAppSelector(getLeague(fixture?.leagueId));

  const liveIcon =
    <div className='absolute top-4 left-4'>
      <div className='relative inline-flex'>
        <div className='bg-red-600 rounded uppercase text-white font-semibold px-1 text-sm'>{t('fixture.live')}</div>
        <span className='flex absolute h-2 w-2 top-0 right-0 -mt-1 -mr-1'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-red-600'></span>
            </span>
      </div>
    </div>;

  if (fixture && league) {
    return (

      <div className='h-full flex flex-col py-4 relative'>
        {fixture.status === 'ONGOING' && liveIcon}
        <div className='flex items-center justify-center h-3'>
          <img alt='' className='h-full' src={league.logoUrl} />
          <div className='text-xs font-semibold text-slate-600'>{league.name}</div>
        </div>
        <div className='text-center font-semibold text-sm text-slate-400'>
          {getFixtureReadableDate(i18n.resolvedLanguage, fixture.date)}
        </div>
        <div className='flex flex-col justify-center grow h-12'>
          <div className='flex justify-between h-2/3 mx-12'>
            <div className='h-full'>
              <img alt='' className='h-full' src={fixture.homeTeam.logoUrl} />
            </div>

            <div className='flex items-center justify-center font-semibold text-2xl'>
              <div className={`pr-5 ${getWinnerId(fixture) === fixture.homeTeam.id && 'text-lime-600'}`}>{fixture.awayTeam.goal}</div>
              <div>-</div>
              <div className={`pl-5 ${getWinnerId(fixture) === fixture.awayTeam.id && 'text-lime-600'}`}>{fixture.awayTeam.goal}</div>
            </div>

            <div className='h-full'>
              <img alt='' className='h-full' src={fixture.awayTeam.logoUrl} sizes='100vw' />
            </div>
          </div>
        </div>
      </div>
    );
  }

}