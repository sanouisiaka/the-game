'use client'

import Header from '@/components/header'
import Bento from '@/components/bento';

export default function Home() {


  return (
    <div className="h-full flex flex-col bg-zinc-200">
      <div className="h-1/6">
        <Header/>
      </div>
      <div className="grow">
        <Bento/>
      </div>
    </div>
  )

}