// 'use client'

// import { supabase } from "@/lib/db";
// import { useEffect, useState } from "react";

// const CountriesInfo = () => {
  
//   const [countries, setCountries] = useState<any[]>([])

//   useEffect(() => {
//     (async () => {
//       const { data } = await supabase.from('countries').select()
//       setCountries(data as any)
//     })();
//   }, [])


//   if (countries) {
//     return (
//       <div>
//         {countries.map((country) => (
//           <div key={country.id}>{country.name}</div>
//         ))}
//       </div>
//     )
//   }
//   else if(!countries)
//     return <p>No countries..</p>

  
  
//   return <p>Loading...</p>
// }
 
// export default CountriesInfo;