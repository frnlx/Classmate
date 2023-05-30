import { Arrow, Content, Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip"

export default function TooltipBase(p: {
  trigger: React.ReactNode
  bold?: string
  text?: string
  children?: React.ReactNode
}) {
  return (<Provider>
    <Root>
      <Trigger>{ p.trigger }</Trigger>
      <Portal>
        <Content>
          <Arrow />
          { p.bold ? <span></span> : null }
          { p.children }
        </Content>

      </Portal>
    </Root>
  </Provider>)
}