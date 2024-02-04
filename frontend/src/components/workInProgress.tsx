export default function WorkInProgress() {

  return (
    <div className='h-full w-full relative opacity-10 italic'>
      <div className='banner-wip absolute top-0 -left-1/4 h-6 w-1/2 bg-amber-950 -rotate-45 translate-x-1/4'></div>
      <div className='banner-wip absolute bottom-0 -right-1/4 h-6 w-1/2 bg-amber-950 -rotate-45 -translate-x-1/4'></div>

      <div className='h-full w-full flex items-center justify-center font-bold text-neutral-800 uppercase'>
        cette section arrive bientot !
      </div>
    </div>
  );
}
