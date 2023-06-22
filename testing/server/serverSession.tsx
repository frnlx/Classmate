// // This is an example of how a server component looks like that requires a session.


// import { Session } from "next-auth";


// const ServerSessionInfo = ({ session }: { session:Session }) => {
//   return (
//     <div>
//       <div>
//         <p>✔️Logged In</p>
//         <p><span className='text-zinc-400 font-semibold text-sm'>Expires:</span><br />{session.expires}</p>
//         <p><span className='text-zinc-400 font-semibold text-sm'>Name:</span> <br />{session.user?.name}</p>
//         <p><span className='text-zinc-400 font-semibold text-sm'>Raw:</span> <br />{JSON.stringify(session)}</p>
//       </div>
//       : <p>❌ Not Logged In</p>
//     </div>
//   );
// }
 
// export default ServerSessionInfo;