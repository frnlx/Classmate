import { prisma } from "@/server/config/dbConfig";
import JoinClassButton from "./JoinClassButton";
import AppBackground from "../../client/static/background";
import { useServerSession } from "@/server/lib/auth";

const InviteToClassRoomPage = async (p: { params: {inviteID: string} }) => {

  const session = await useServerSession()
  
  const classroom = await prisma.classroom.findFirst({
    where: {
      inviteID: p.params.inviteID
    },
    include: {
      members: true
    }
  })
  

  return (
    <AppBackground>
      {
        classroom ?
          classroom.members.find(user=>user.id !== session.user.id) ? 
            <>
              <h2>You are Invited to: </h2>
              <h1>{classroom?.name}</h1>
              <p>Invite ID: {p.params.inviteID}</p>
              <JoinClassButton userId={session.user.id} classId={classroom.id} />
            </>
            :
            <h2>
              You already joined {classroom?.name}!
            </h2>
          :
          <h2>
            Invalid Invite Link!
          </h2>
      }
    </AppBackground>
  );
}
 
export default InviteToClassRoomPage;