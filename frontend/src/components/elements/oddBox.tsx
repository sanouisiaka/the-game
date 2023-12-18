import React, { PropsWithRef } from 'react';

export default function OddBox (props: PropsWithRef<{odd?: number}>) {
  return <button className="rounded-sm border border-sunset-400 bg-sunset-100 color-black font-semibold py-1 px-2 hover:bg-sunset-200">
    { props.odd}
  </button>
}