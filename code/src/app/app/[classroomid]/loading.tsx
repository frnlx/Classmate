import SignOutButton from "@/component/client/auth/sign-out-button";
import Spinner from "@/component/ui/spinner";

const LoadingScreen = () => {
  return (
    <div className="text-slate-500 w-full h-full flex flex-col gap-4 justify-center items-center">
      <Spinner />
      <div className="text-2xl font-semibold">Loading...</div>
      <SignOutButton />
    </div>
  );
}
 
export default LoadingScreen;