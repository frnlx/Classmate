import ClientInfo from "@/component/client/clientinfo";
import UpdateProfileForm from "@/component/client/profileForm";
import Card from "@/component/ui/card";

const ProfilePage = () => {
  return (
    <main>
      <Card>
        <UpdateProfileForm />
      </Card>
    </main>
  );
}
 
export default ProfilePage;