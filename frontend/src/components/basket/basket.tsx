import '../../app/ripped.scss';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { BasketType, getBasketBets, getBasketType, isBetsSubmitting, submitBetsThunk } from '@/corelogic/store/basket/basket.store';
import { BasketTypeSelector } from '@/components/basket/basketTypeSelector';
import { BasketItem } from '@/components/basket/basketItem';
import { BasketSinglesSummary } from '@/components/basket/basketSinglesSummary';
import { useTranslation } from '@/i18n/client';
import { BasketParlaySummary } from '@/components/basket/basketParlaySummary';
import LoadingSpinnerSvg from '@/components/elements/svg/loadingSpinnerSvg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Basket() {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const bets = useAppSelector(getBasketBets);

  const type = useAppSelector(getBasketType);

  const submitting = useAppSelector(isBetsSubmitting);

  function submitBets() {
    dispatch(submitBetsThunk()).then(() => toast(t('bet.submitted'), { type: 'success' }));
  }


  return (
    <div className='h-full w-full flex flex-col p-4 relative'>
      <ToastContainer />
      {
        submitting &&
        <div className='absolute z-10 top-0 left-0 w-full h-full bg-neutral-100 opacity-50 flex items-center'>
          <div className='m-auto h-8 w-8'><LoadingSpinnerSvg /></div>
        </div>
      }
      <div className='bg-neutral-100 w-full h-4/5 grow ripped-paper flex flex-col my-2'>
        <BasketTypeSelector />

        {
          bets.length === 0
            ? <div className='h-full flex items-center justify-center font-semibold text-neutral-300 text-center uppercase'>{t('bet.emptyBasket')}</div>
            : <div className={`mx-4 overflow-y-auto max-h-2/3 ${type === BasketType.MULTIPLE && 'border-y border-neutral-400'}`}>
              {bets.map(bet => <BasketItem key={bet.id + bet.selectedOption} bet={bet} type={type} />)}
            </div>
        }
        {type === BasketType.SINGLE
          ? <BasketSinglesSummary />
          : <BasketParlaySummary />
        }
        {bets.length > 0 &&
          <div className='mx-auto my-2'>
            <button className='rounded-md bg-violet-700 text-gray-100 px-2 py-1'
                    onClick={() => submitBets()}>{t('submit')}</button>
          </div>
        }
      </div>


    </div>
  );
}