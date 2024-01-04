import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  basketSlice,
  getBasketBets,
  getBasketParlayAmount,
  getParlayOdd,
  getParlayPotential,
} from '@/corelogic/store/basket/basket.store';
import { useTranslation } from '@/i18n/client';
import { BetAmountInput } from '@/components/elements/betAmountInput';

export function BasketParlaySummary() {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const bets = useAppSelector(getBasketBets);

  const parlayAmount = useAppSelector(getBasketParlayAmount);

  const parlayOdd = useAppSelector(getParlayOdd);

  const parlayPotential = useAppSelector(getParlayPotential);

  function addParlayAmount(amount: number) {
    dispatch(basketSlice.actions.addParlayAmount(amount));
  }

  if (bets.length > 0) {
    return (
      <div className='flex flex-col w-full text-sm text-neutral-900 px-4 pt-2'>
        <div className='flex flex-wrap justify-between items-center font-bold'>
          <div>
            {t('bet.parlayOdd')}
          </div>
          <div className='text-xs'>
            {parlayOdd}
          </div>
        </div>
        <BetAmountInput inputValue={parlayAmount} potential={parlayPotential} action={addParlayAmount} />

      </div>
    );
  }

}