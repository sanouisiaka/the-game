'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Welcome from '@/components/welcome';

export default function Root() {

  const { status } = useSession();
  if (status === 'authenticated') {
    redirect('/home');
  }

  return (
    <div className="h-full flex flex-col has-background-primary">
      <div className="flex-initial h-1/6"></div>
      <div className="flex-auto">
        <Welcome/>
      </div>
      <div className="flex-auto h-1/6"></div>
    </div>
  );

}
