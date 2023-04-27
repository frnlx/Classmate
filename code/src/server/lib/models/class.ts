// import { supabase } from "@/server/config/dbConfig";
// import { Database } from "@/server/types/database";

// type DBClass = Database['public']['Tables']['classes']
// export type Class = DBClass['Row']

// export async function createClass(data: DBClass['Insert']) {

//   const { error } = await supabase.from('classes').insert(data)
//   if (error) throw error

// }

// export async function findClass(id: string) {
  
//   const { error, data } = await supabase.from('classes').select().eq('id', id)
//   if (error) throw error;

//   if (data && data[0]) {
//     return data[0]
//   } else {
//     return null
//   }
  
// }

// // WIP
// export async function getClassesOfUser(id: string) {
  
//   const { error, data } = await supabase.from('classes').select(`*, users ( id )`)
//   if (error) throw error;

//   if (data) {
//     console.log( data )
//   }

// }

// export async function updateClass(id: string, input: DBClass['Update']) {
//   const { error, data } =
//     await supabase
//       .from('classes')
//       .update(input)
//       .eq('id', id)
  
//   return { error, data }
// }