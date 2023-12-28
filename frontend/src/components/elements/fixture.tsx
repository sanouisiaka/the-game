import React, { PropsWithChildren } from 'react';
import OddBox from '@/components/elements/oddBox';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getLeague } from '@/corelogic/store/leagues/leagues.store';
import { getFixture } from '@/corelogic/store/fixtures/fixtures.store';
import { useTranslation } from '@/i18n/client';
import { basketSlice } from '@/corelogic/store/basket/basket.store';

export default function Fixture(props: PropsWithChildren<{ id: string }>) {

  const { i18n } = useTranslation();


  const fixture = useAppSelector(getFixture(props.id));
  const league = useAppSelector(getLeague(fixture?.leagueId));

  const dispatch = useAppDispatch();

  function handleAddBetToBasket(option: string) {
    const bet = getBet(option);
    if (fixture && bet) {
      dispatch(basketSlice.actions.addBet({ fixture, betId: bet.id }));
    }
  }

  function getBet(option: string) {
    return fixture?.winnerBets.find(b => b.winOption === option);
  }

  function Odds() {
    if (fixture && fixture.status === 'OPEN') {
      return (
        <div className='h-full justify-around flex flex-row space-between items-center'>
          <div className='w-1/6 flex justify-center' onClick={() => handleAddBetToBasket('HOME')}>
            <OddBox odd={getBet('HOME')?.odd} />
          </div>
          <div className='w-1/6 flex justify-center' onClick={() => handleAddBetToBasket('DRAW')}>
            <OddBox odd={getBet('DRAW')?.odd} />
          </div>
          <div className='w-1/6 flex justify-center' onClick={() => handleAddBetToBasket('AWAY')}>
            <OddBox odd={getBet('AWAY')?.odd} />
          </div>
        </div>
      );
    }
  }

  const getFixtureReadableDate = (date: string) => new Date(date).toLocaleString(i18n.resolvedLanguage,
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });


  if (fixture && league) {
    return (
      <div className='border border-sunset-400 rounded-md px-2 sm:px-4 md:px-6 lg:px-12 py-2 hover:bg-sunset-50'>
        <div className='flex items-center justify-center h-3'>
          <img alt='' className='h-full' src={league.logoUrl} />
          <div className='text-xs font-semibold text-slate-600'>{league.name}</div>
        </div>
        <div className='text-center font-semibold text-sm text-slate-400'>
          {getFixtureReadableDate(fixture.date)}
        </div>
        <div className='flex h-8 justify-between'>
          <div className='w-2/5 flex items-center'>

            <img alt='' className='h-full pr-2' src={fixture.homeTeam.logoUrl} />
            <div className='font-medium text-sm lg:text-base'>{fixture.homeTeam.name}</div>
          </div>

          <div className='flex items-center justify-center font-semibold'>
            <div>-</div>
          </div>

          <div className='w-2/5 flex items-center flex-row-reverse'>
            <img alt='' className='h-full pl-2' src={fixture.awayTeam.logoUrl} sizes='100vw' />
            <div className='text-right font-medium text-sm lg:text-base'>{fixture.awayTeam.name}</div>
          </div>
        </div>
        <div className='pt-1'>
          <Odds />
        </div>
      </div>
    );
  }

}
