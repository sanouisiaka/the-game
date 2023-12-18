import React, { PropsWithChildren } from 'react';

export default function Box(props: PropsWithChildren<{ title: string | undefined }>) {

  return (
    <div className='h-full bg-white rounded-md flex flex-col overflow-hidden'>

      {props.title &&
        <div className='flex-none text-center font-semibold flex items-center justify-center h-8 border-b'>{props.title}</div>
      }
      <div className='grow overflow-hidden'>
        {props.children}
      </div>
    </div>
  );
}
