import '../../app/ripped.scss';
import { useAppSelector } from '@/hooks';
import { BasketType, getBasketBets, getBasketType } from '@/corelogic/store/basket/basket.store';
import { BasketTypeSelector } from '@/components/basket/basketTypeSelector';
import { BasketItem } from '@/components/basket/basketItem';
import { BasketSinglesSubmit } from '@/components/basket/basketSinglesSubmit';
import { useTranslation } from '@/i18n/client';
import { BasketParlaySubmit } from '@/components/basket/basketParlaySubmit';

export default function Basket() {

  const { t } = useTranslation();

  const bets = useAppSelector(getBasketBets);

  const type = useAppSelector(getBasketType);

  return (
    <div className='h-full w-full flex flex-col p-4'>

      <div className='bg-neutral-100 w-full h-4/5 grow ripped-paper flex flex-col my-2'>
        <BasketTypeSelector />

        {
          bets.length === 0
            ? <div className='mt-4 italic font-semibold text-neutral-600 text-center'>{t('bet.addBetToStart')}</div>
            : <div className={`mx-4 overflow-y-auto max-h-2/3 ${type === BasketType.MULTIPLE && 'border-y border-neutral-400'}`}>
              {bets.map(bet => <BasketItem key={bet.id + bet.selectedOption} bet={bet} type={type} />)}
            </div>
        }
        {type === BasketType.SINGLE
          ? <BasketSinglesSubmit />
          : <BasketParlaySubmit />
        }
      </div>
    </div>
  );
}