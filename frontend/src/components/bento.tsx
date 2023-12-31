import Box from '@/components/elements/box';
import BetSelector from '@/components/betSelector';
import UserInfo from '@/components/elements/userInfo';
import { useTranslation } from '@/i18n/client';
import Basket from '@/components/basket/basket';
import LastFixtures from '@/components/lastFixtures';

export default function Bento() {
  const { t } = useTranslation();

  return (
    <div className='md:h-full md:grid md:grid-cols-5 md:grid-rows-4 md:gap-3 p-2'>
      <div className='py-2 md:py-0 md:row-start-1 md:col-start-3'>
        <Box title={undefined} accordion={false}>
          <UserInfo />
        </Box>
      </div>
      <div className='py-2 md:py-0 md:col-start-5 md:row-span-4'>
        <Box title='BET' accordion={true}>
          <Basket />
        </Box>
      </div>
      <div className='py-2 md:py-0 md:row-start-1 md:row-span-3 md:col-start-1 md:col-span-2'>
        <Box title={t('fixture.incoming')} accordion={true}>
          <BetSelector />
        </Box>
      </div>
      <div className='py-2 hidden md:block md:py-0 md:row-start-1 md:col-start-4'>
        <Box title='Derniers matches' accordion={false}>
          <LastFixtures />
        </Box>
      </div>
      <div className='py-2 md:py-0 md:row-start-2 md:row-span-2 md:col-start-3 md:col-span-2'>
        <Box title={t('ranking')} accordion={false}>
        </Box>
      </div>

      <div className='py-2 md:py-0 md:row-start-4 md:col-span-4 md:col-start-1'>
        <Box title={t('bet.last')} accordion={false}/>
      </div>
    </div>
  );
}
