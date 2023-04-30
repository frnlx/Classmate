import { AppResponse } from "./responses"

export const logError = (cb: () => any) => {
  return () => {
    try {
      cb()
    } catch (error) {
      console.log(error)
      return AppResponse.error(error)
    }
  }
}