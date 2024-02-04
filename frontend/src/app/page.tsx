'use client';

import Bento from '@/components/bento';
import { useAppDispatch } from '@/hooks';
import { retrieveUserThunk } from '@/corelogic/store/user/user.store';
import { retrieveLeaguesThunk } from '@/corelogic/store/leagues/leagues.store';
import { getSession } from "next-auth/react";

export default function Home() {

	getSession().then(session => {
		const name = session?.user?.name ? { name: session?.user?.name } : undefined;
		dispatch(retrieveUserThunk(name));

	});


	const dispatch = useAppDispatch();
	dispatch(retrieveLeaguesThunk());

	return (
		<div className='h-5/6 overflow-scroll flex flex-col bg-neutral-50'>
			<div>
				<Bento/>
			</div>
		</div>
	);

}