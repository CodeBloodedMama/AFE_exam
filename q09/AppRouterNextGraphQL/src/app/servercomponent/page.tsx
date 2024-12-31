"server-only"
import { gql } from "@apollo/client";
import { getClient } from "../../../lib/apolloClientServer";
import styles from './Skills.module.css';
// import { useEffect, useState } from "react";

export type Skill = {
  index: string;
  name: string;
  desc: string;
};
// gql fra @apollo/client definerer GraphQL-forespørgsler.
const query = gql` query { 
  class {
    name
  }
}`;

const skillsQuerry = gql` query Skills {
  skills {
    index
    name
    desc
  }
}`;

export default async function Page() {

// Client side code for reference

  // const [counter, setCounter] = useState<number>(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((counter) => counter + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  const client = getClient(); // funktionen er en instans af ApolloClient(grapgql-client)

  const { data } = await client.query({ query ,     
    context: {
      fetchOptions: {
        cache: 'no-store',
      },
  },});

  const { data: skills } = await client.query({ query: skillsQuerry,
    context: {
      fetchOptions: {
        cache: 'no-store',
      },
    },
  });

  return (
    <main>
      <div style={
        {
          border: "1px solid Green",
          padding: "1rem",
          margin: "1rem",
        }
      }>
        Data from server:
      
      <p>{data.class.name}</p>
      <h1 className={styles.title}>Skills</h1>
      {skills.skills.map((skill: Skill) => (
        <div key={skill.index} className={styles.card}>
          <h2 className={styles.cardTitle}>{skill.name}</h2>
          <p className={styles.cardDescription}>{skill.desc}</p>
        </div>
      ))}
      </div>
    </main>
  )
}
