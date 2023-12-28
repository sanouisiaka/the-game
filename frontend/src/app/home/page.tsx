'use client'

import Header from '@/components/header'
import Bento from '@/components/bento';
import { useAppDispatch } from '@/hooks';
import { retrieveUserThunk } from '@/corelogic/store/user/user.store';
import { retrieveLeaguesThunk } from '@/corelogic/store/leagues/leagues.store';

export default function Home() {

  const dispatch = useAppDispatch();
  dispatch(retrieveUserThunk());
  dispatch(retrieveLeaguesThunk());

  return (
    <div className="h-full flex flex-col bg-neutral-50">
      <div className="h-1/6">
        <Header/>
      </div>
      <div className="overflow-scroll md:h-5/6">
        <Bento/>
      </div>
    </div>
  )

}