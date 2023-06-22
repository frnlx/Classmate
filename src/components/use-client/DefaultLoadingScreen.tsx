import Spinner from '@/components/use-client/Spinner'
import { SignOutButton } from './Auth'

export default function DefaultLoadingScreenGenerator(name: string) {
  return function DefaultLoadingScreen() {
    return (
      <div className="text-slate-500 w-full h-full flex flex-col gap-4 justify-center items-center flex-grow basis-full ">
        <Spinner />
        <div className="text-2xl font-semibold">Loading { name }...</div>
      </div>
    )
  }
}
