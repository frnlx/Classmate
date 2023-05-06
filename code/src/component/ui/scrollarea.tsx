'use client'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import { ReactNode } from 'react';
import './scrollarea.css'

const ScrollArea = (p: { children: ReactNode }) => {
  return (<RadixScrollArea.Root className='ScrollAreaRoot' type='scroll'>
    <RadixScrollArea.Viewport className="ScrollAreaViewport">
      {p.children}
    </RadixScrollArea.Viewport>
    <RadixScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
      <RadixScrollArea.Thumb className="ScrollAreaThumb" />
    </RadixScrollArea.Scrollbar>
    {/* <RadixScrollArea.Scrollbar className="ScrollAreaScrollbar flex select-none touch-none p-1" orientation="horizontal">
      <RadixScrollArea.Thumb className="ScrollAreaThumb" />
    </RadixScrollArea.Scrollbar> */}
    <RadixScrollArea.Corner className="ScrollAreaCorner" />
  </RadixScrollArea.Root>);
}
 
export default ScrollArea;