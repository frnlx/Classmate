import { supabase } from "@/server/config/dbConfig";

const ServerFetchFromSupabase = async () => {

  const { data: countries, status } = await supabase.from('countries').select()

  return (
    <div>
    {
      countries ? 
        countries.map((country) => (
          <div key={country.id}>{country.name}</div>
        ))
        : null
    }
    </div>
  );
}
 
export default ServerFetchFromSupabase;