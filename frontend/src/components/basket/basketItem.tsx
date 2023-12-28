import { basketSlice, BasketType, Bet, getBetPotential } from '@/corelogic/store/basket/basket.store';
import FootballSvg from '@/components/elements/svg/footballSvg';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getLeagues } from '@/corelogic/store/leagues/leagues.store';
import { PropsWithRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '@/i18n/client';
import { BetAmountInput } from '@/components/elements/betAmountInput';

export function BasketItem(props: PropsWithRef<{ bet: Bet, type: BasketType }>) {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const leagues = useAppSelector(getLeagues);

  const bet = props.bet;
  const type = props.type;

  const betPotential = useAppSelector(getBetPotential(bet.id));

  const updateBetAmount = (newAmount: number) =>
    dispatch(basketSlice.actions.addAmountToBet({ betId: bet.id, amount: newAmount }));


  let selectedOption;
  if (bet.selectedOption === 'HOME') {
    selectedOption = bet.fixture.homeTeam;
  } else if (bet.selectedOption === 'AWAY') {
    selectedOption = bet.fixture.awayTeam;
  }

  return (
    <div key={bet.id + bet.selectedOption} className='text-xs'>
      <div className={`flex flex-col center py-2 my-2 ${type === BasketType.SINGLE && 'border-y border-neutral-400'}`}>
        <div className='h-3 mb-1 flex justify-between'>
          <div className='flex h-full mb-2'>
            <FootballSvg />
            <div className='pl-1 flex items-center font-semibold text-neutral-600'>
              {leagues.find(l => l.id === bet.fixture.leagueId)?.name}
            </div>
          </div>

          <button onClick={() => dispatch(basketSlice.actions.removeBet(bet.id))}>
            <FontAwesomeIcon icon={faTrash} className='h-full text-neutral-600 mr-1' />
          </button>

        </div>
        <div className='mb-1 text-neutral-800 font-bold'>
          {bet.fixture.homeTeam} - {bet.fixture.awayTeam}
        </div>
        <div className='flex justify-between'>
          <div className='rounded text-neutral-800 font-semibold bg-sunset-300 px-2'>{selectedOption ? selectedOption : t('bet.draw')}</div>
          <div className='font-bold'>{bet.odd}</div>
        </div>

        {type === BasketType.SINGLE &&
          <BetAmountInput inputValue={bet.amount} potential={betPotential} action={updateBetAmount} />
        }
      </div>
    </div>
  );

}