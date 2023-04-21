import { createClient } from "@supabase/supabase-js";
import env from "./env";
import { Database } from "../types/database";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)