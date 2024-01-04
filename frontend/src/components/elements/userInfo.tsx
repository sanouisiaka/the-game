import FootballPlayerSvg from '@/components/elements/svg/footballPlayerSvg';
import { useAppSelector } from '@/hooks';
import { getConnectedUser } from '@/corelogic/store/user/user.store';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PointsSvg from '@/components/elements/svg/pointsSvg';

export default function UserInfo() {

  const connectedUser = useAppSelector(getConnectedUser);

  const Info = () => (
    <div className='h-full w-full'>
      <div className='h-1/2'>
        <div className='justify-center flex h-full'>
          <div className='w-1/5 md:w-1/2'>
            <div className='h-full w-fit rounded-full bg-sunset-400 border border-black overflow-hidden'>
              <FootballPlayerSvg />
            </div>
          </div>
          <div className='w-4/5 md:w-1/2'>
            <div className='h-full flex flex-col justify-center text-lg leading-none'>
              {connectedUser.firstname} {connectedUser.lastname}
              <br />
              <span className='text-xs font-normal'>Depuis: 01/01/1990</span>
            </div>
          </div>
        </div>
      </div>
      <div className='h-1/2 flex flex-col justify-center px-3 text-violet-700'>
        <div className='flex w-full h-1/2'>
          <div className='w-1/2 flex items-center flex-wrap'>
            <div className='h-full'>
              <FontAwesomeIcon icon={faRankingStar} className='h-full text-violet-700' />
            </div>
            <div>
              54<span className='text-xs font-semibold'>/1239</span>
            </div>
          </div>
          <div className='w-1/2 flex items-center flex-wrap justify-end'>
            <div className='h-full'>
              <PointsSvg />
            </div>
            <div>
              5213 <span className='text-xs font-semibold'>betP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='flex bg-sunset-100 h-full w-full flex-col p-4 font-bold'>
      {connectedUser.id && <Info/>}
    </div>
  );
}