import { BetPoints } from '@/components/elements/betPoints';
import { useAppSelector } from '@/hooks';
import { getBasketBets, getBetsTotalAmount, getTotalBetsPotential } from '@/corelogic/store/basket/basket.store';
import { useTranslation } from '@/i18n/client';

export function BasketSinglesSubmit() {

  const { t } = useTranslation();

  const bets = useAppSelector(getBasketBets);

  const totalAmount = useAppSelector(getBetsTotalAmount);

  const cumulatePotential = useAppSelector(getTotalBetsPotential);

  if (bets.length > 0) {
    return (
      <div className='flex flex-col w-full text-sm text-neutral-900 px-4 pt-2'>
        <div className='flex flex-wrap justify-between items-center font-bold'>
          <div>
            Mise Total
          </div>
          <BetPoints points={totalAmount} />
        </div>
        <div className='flex flex-wrap justify-between items-center font-bold'>
          <div>
            {t('bet.totalPotentialGain')}
          </div>
          <BetPoints points={cumulatePotential} />
        </div>
        <div className='mx-auto my-2'>
          <button className='rounded-md bg-violet-700 text-gray-100 px-2 py-1'>{t('submit')}</button>
        </div>
      </div>
    );
  }

}