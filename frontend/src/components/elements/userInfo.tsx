import FootballPlayerSvg from '@/components/elements/footballPlayerSvg';

export default function UserInfo() {

  return (
    <div className='flex bg-sunset-100 h-full w-full flex-col p-4'>
      <div className='h-1/2'>
        <div className='flex h-full'>
          <div className='rounded-full bg-sunset-500 overflow-hidden'>
            <FootballPlayerSvg />
          </div>
          <div>
            <div>
              Isiaka SANOU
            </div>
          </div>
        </div>
      </div>
      <div className='h-1/2 flex'>
        <div>
          Place: 54ème
        </div>
        <div>
          5213 betPoints
        </div>
      </div>
    </div>
  );
}