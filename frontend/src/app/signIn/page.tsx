'use client';

import WelcomeFr from '@/components/welcomeFr';

export default function Root() {

  return (
    <div className="h-full flex flex-col has-background-primary">
      <div className="flex-initial h-1/6"></div>
      <div className="flex-auto">
        <WelcomeFr/>
      </div>
      <div className="flex-auto h-1/6"></div>
    </div>
  );

}
