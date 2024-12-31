"use client";
// Angiver, at denne komponent skal være dynamisk
export const dynamic = "force-dynamic";

import { gql, useSuspenseQuery } from "@apollo/client";
import { useEffect, useState } from "react";


// Definer en GraphQL-forespørgsel
const query = gql`query {
  class {
    name
  }
}`
//Definer en react component, der bruger apollo client til at hente data fra serveren
export default function ClientComponent() {
  // brug useSuspenseQuery til at udføre en GraphQL-forespørgsel og håndtere data tilstande
  const { data } = useSuspenseQuery<{ class: { name: string } }>(query);
  
  // brug en state til at tælle sekunder
  const [counter, setCounter] = useState<number>(0);

  // bruger useEffect til at opdatere tælleren hvert sekund
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    //litle div box with nice border
    <div style={ 
      {
        border: "1px solid Blue",
        padding: "1rem",
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

      }

    }>
      {/* Vis klassenavnet hentet fra GraphQL */}
      Data from client:
      <br />
      {data.class.name} 
      <br />
      {/* Vis tælleren */}
      Counting Seconds as Client:  {counter}
    </div>
  );
}

