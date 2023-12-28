import { basketSlice, BasketType, getBasketBets, getBasketType } from '@/corelogic/store/basket/basket.store';
import { useAppDispatch, useAppSelector } from '@/hooks';

export function BasketTypeSelector() {

  const dispatch = useAppDispatch();

  const bets = useAppSelector(getBasketBets);

  const type = useAppSelector(getBasketType);

  const selectedTypeClass = 'bg-sunset-400 text-gray-100';


  return (
    <div className='flex h-6 font-medium text-gray-400 mx-4 my-3'>
      <button
        className={`uppercase flex-1 rounded-l-md ${bets.length > 0 && type === BasketType.SINGLE ? selectedTypeClass : 'bg-gray-100'} `}
        onClick={() => dispatch(basketSlice.actions.setBasketType(BasketType.SINGLE))}>
        single
      </button>
      <button
        className={`uppercase flex-1 rounded-r-md ${bets.length > 0 && type === BasketType.MULTIPLE ? selectedTypeClass : 'bg-gray-100'}`}
        onClick={() => dispatch(basketSlice.actions.setBasketType(BasketType.MULTIPLE))}>
        multiple
      </button>
    </div>
  );
}