import { prisma } from "@/lib/db";
import { getLoggedInSession_redirectIfNotAuth } from "@/lib/auth"
import AppBackground from "@/components/static/background"
import JoinClassButton from "./JoinClassButton";
import { redirect } from "next/navigation";
import { SignInButton } from "@/components/use-client/Auth";

const InviteToClassRoomPage = async (p: { params: {inviteID: string} }) => {

  const session = await getLoggedInSession_redirectIfNotAuth()

  // Fetch the appropriate classroom from the invite link.
  const classroom = await prisma.classroom.findFirst({
    where: { inviteID: p.params.inviteID },
    include: { members: true }
  })

  // If the classroom is not found
  if (!classroom)
    return <>
      <h2>Invalid Invite Link!</h2>
      <p>Classroom not found!</p>
    </>

  // If the user already joined the classroom
  if (session && classroom?.members.find(user => user.id === session.user.id))
    redirect(`/classroom/${classroom.id}`)

  return (
    <AppBackground>
      {
        <>
          <h2>You are Invited to: </h2>
          <h1>{classroom?.name}</h1>
          <p>Invite ID: {p.params.inviteID}</p>
          {
            session ? <JoinClassButton userId={session.user.id} classId={classroom.id} /> : null
          }
          {
            !session ? <SignInButton /> : null
          }
        </>
      }
    </AppBackground>
  );
}
 
export default InviteToClassRoomPage;