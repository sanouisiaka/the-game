import React, { PropsWithChildren } from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';

export default function Box(props: PropsWithChildren<{ title: string | undefined, accordion: boolean }>) {

  function MobileBox() {
    return (
      <Accordion className={props.accordion ? 'md:hidden' : 'hidden'}>
        <AccordionPanel>
          <AccordionTitle>{props.title}</AccordionTitle>
          <AccordionContent className='p-0'>
            {props.children}
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    );
  }

  function DesktopBox() {
    return (
      <div className={
        `h-full bg-white rounded-md flex-col overflow-hidden ${props.accordion ? 'hidden md:flex' : 'flex'}`}
      >

        {props.title &&
          <div className='flex-none text-center font-semibold flex items-center justify-center h-8 border-b'>{props.title}</div>
        }
        <div className='grow overflow-hidden'>
          {props.children}
        </div>
      </div>
    );
  }

  return (
    <>
      <MobileBox />
      <DesktopBox />
    </>
  );
}
