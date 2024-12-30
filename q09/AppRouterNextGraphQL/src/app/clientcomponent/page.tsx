"use client";

export const dynamic = "force-dynamic";

import { gql, useSuspenseQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const query = gql`query {
  class {
    name
  }
}`

export default function ClientComponent() {
  const { data } = useSuspenseQuery<{ class: { name: string } }>(query);
  const [counter, setCounter] = useState<number>(0);
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
      Data from client:
      <br />
      {data.class.name} 
      <br />
      Counting Seconds as Client:  {counter}
    </div>
  );
}

