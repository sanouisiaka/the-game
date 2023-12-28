import PointsSvg from '@/components/elements/svg/pointsSvg';
import { useTranslation } from '@/i18n/client';

export function BetAmountInput(props: { inputValue: number, potential: number, action: (value: number) => void }) {

  const { t } = useTranslation();

  return (
    <div className='flex flex-wrap justify-between mt-4 mb-2'>
      <div className='flex items-center focus:text-violet-700'>
        <label className='mr-1 text-xs text-neutral-400 focus:text-violet-700' htmlFor='betting'>
          {t('bet.bet')}
        </label>
        <div className='relative rounded-md'>
          <div className='absolute inset-y-0 left-0 flex items-center'>
            <div className='h-full p-1'>
              <PointsSvg />
            </div>
          </div>
          <input
            type='number'
            name='betting'
            id='betting'
            value={props.inputValue === 0 ? '' : props.inputValue}
            onChange={(e) => props.action(parseInt(e.target?.value ? e.target.value : '0'))}
            className='text-xs text-violet-700 font-bold block w-14 p-1 rounded border-0 pl-5 text-gray-900 placeholder:text-neutral-200 ring-1 ring-inset ring-gray-300 focus:ring-violet-700'
            placeholder='0'
          />
        </div>
      </div>
      <div className='flex items-center'>
        <div className='text-xs text-violet-700 font-semibold pr-2'>
          {t('bet.potentialGain')}:
        </div>
        <div className='flex items-center text-xs text-violet-700 font-bold'>
          {props.potential}
          <div className='w-4 h-full'>
            <PointsSvg />
          </div>
        </div>
      </div>
    </div>

  );
}