import ClientInfo from "@/component/client/clientinfo";
import UpdateProfileForm from "@/component/client/profileForm";
import Card from "@/component/ui/card";
import Link from "next/link";

const ProfilePage = () => {
  return (
      <div>
        <h1>Update Profile</h1>
        <Card>
          <UpdateProfileForm />
        </Card>
        <Link href='/app'>
          Back to App
        </Link>
      </div>
  );
}
 
export default ProfilePage;