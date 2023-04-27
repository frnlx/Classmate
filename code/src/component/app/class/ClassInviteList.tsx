'use client'

import { useSelectedClass } from "../context/ClassContext";

const ClassInviteList = () => {

  const { data } = useSelectedClass();
  // const [classInvites, setClassInvites] = useState<ClassInvites[]>([]);

  // const fetchClassInvites = () => {
  //   axios(Routes.ClassInvites(selectedClass.data!.id)).then(
  //     (res) => {
  //       setClassInvites(res.data)
  //     }
  //   )
  // }

  // useEffect(() => (
  //   fetchClassInvites()
  // ), [])

  return (
    <div>
      {/* {
        classInvites===undefined ? 'Loading Class Invite Data...' : 
          classInvites.map(invite => <div key={invite.id}>{invite.invite_link} | valid until {invite.valid_until.toISOString()}</div>)
      }
      <button type="button">Create new Invite</button> */}
      <a href={`/app/join/${data!.inviteID}`}>{data!.inviteID}</a>
    </div>
  );
}
 
export default ClassInviteList;