import { createContext, useContext } from "react"

export function createReactContext<ContextType>(init: ContextType) {
  const context = createContext<ContextType>(init)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hook = () => useContext(context)
  return {
    provider: context.Provider,
    hook,
    context
  }
}