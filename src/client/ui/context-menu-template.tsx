'use client'

import { IconContext } from "@phosphor-icons/react";
import { Content, Item, Portal, Root, Trigger } from "@radix-ui/react-context-menu";
import { ReactNode } from "react";
import "./context-menu-template.css"

const ContextMenuTemplate = (p: {children: ReactNode, trigger: ReactNode}) => {
  return (
    <Root>
      <Trigger>
        {p.trigger}
      </Trigger>
      <Portal>
        <Content className="ContextMenuContent min-w-[220px] bg-slate-800 rounded-md overflow-hidden p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <IconContext.Provider
            value={{
              size: '1rem',
              weight: 'fill',
            }}
          >
            {p.children}
          </IconContext.Provider>
        </Content>
      </Portal>
    </Root>
  );
}
 
export default ContextMenuTemplate;