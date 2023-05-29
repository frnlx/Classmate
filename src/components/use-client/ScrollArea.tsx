'use client'
import { Root, Viewport, Scrollbar, Thumb, Corner } from '@radix-ui/react-scroll-area'
import { ReactNode } from 'react';
import clsx from 'clsx';

export default function ScrollArea (p: {
  children: ReactNode
}) {
  return (
    <Root
      type='scroll'
      className="flex-grow w-1/2 overflow-hidden"
    >
      <Viewport
        className="w-full h-full rounded-[inherit]"
      >
        {p.children}
      </Viewport>
      <Scrollbar
        className={clsx(
          "flex select-none touch-none p-0.5 transition-[background_160ms_ease-out]",
          "data-[orientation=horizontal]:h-[10px] data-[orientation=horizontal]:flex-col",
          "data-[orientation=vertical]:w-[10px]"
        )}
        orientation="vertical"
        >
        <Thumb className={clsx(
          "bg-slate-600 flex-1 rounded-[10px] relative",
          "before:content-[''] before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
        )} />
      </Scrollbar>
      <Corner className="bg-slate-400" />
    </Root>
  );
}