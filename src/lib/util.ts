import { color } from "./logger/chalk"

export async function sleepInDev(s: number) {
  color.white(`sleeping for ${s} seconds`)
  return await new Promise(resolve => setTimeout(resolve, s * 1000))
}

