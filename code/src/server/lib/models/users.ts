import { supabase } from "@/server/config/dbConfig";
import { Database } from "@/server/types/database";

type DBUser = Database['public']['Tables']['users']
export type User = DBUser['Row']

export async function createUser(data: DBUser['Insert']) {

  const { error } =
    await supabase
      .from('users')
      .insert(data)
  
  if(error) throw error

}

export async function findUser(id: string) {
  const { error, data } =
    await supabase
      .from('users')
      .select()
      .eq('id', id)

  if (error) throw error;

  if (data && data[0]) {
    return data[0]
  } else {
    return null
  }
  
}

export async function updateUser(id:string, input: DBUser['Update']) {
  const { error, data } =
    await supabase
      .from('users')
      .update(input)
      .eq('id', id)
  return { error, data }
}