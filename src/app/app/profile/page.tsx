import UpdateProfileForm from "@/client/testing/profileForm";
import Card from "@/client/static/card";
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