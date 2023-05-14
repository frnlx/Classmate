import SignOutButton from '@/client/auth/sign-out-button';
import Spinner from '@/client/ui/spinner'

const DefaultLoadingScreen = () => {
  return (
    <div className="text-slate-500 w-full h-full flex flex-col gap-4 justify-center items-center flex-grow basis-full ">
      <Spinner />
      <div className="text-2xl font-semibold">Loading...</div>
      <SignOutButton />
    </div>
  );
}
 
export default DefaultLoadingScreen;