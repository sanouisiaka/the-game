'use client'

import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Welcome() {

  const { status } = useSession();
  if (status === 'authenticated') {
    redirect('/home')
  }

  return (
    <div>
      <button onClick={() => signIn('google')}>sign in with gooogle</button>
    </div>
  );

}
