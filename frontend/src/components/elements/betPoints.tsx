import PointsSvg from '@/components/elements/svg/pointsSvg';

export function BetPoints(props: {points: number}) {
  return (
    <div className='flex items-center text-xs text-violet-700 font-bold'>
      <div>
        {props.points}
      </div>
      <div className='w-4 h-full'>
        <PointsSvg />
      </div>
    </div>
  );
}