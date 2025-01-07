import { gql, useQuery } from '@apollo/client';


// Definer en GraphQL-forespørgsel for at hente klassenavne
const query = gql`query {
  classes {
    name
  }
}`

// Definer en React-komponent, der bruger Apollo Client til at udføre forespørgslen
export default function Classes({ onNameSelected}) {

  // Brug useQuery hook til at udføre forespørgslen og håndtere loading, error og data tilstande
  // Viser en loading besked, mens dataene hentes
    const { loading, error, data } = useQuery(query);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    

    // Render en dropdown-menu med de hentede klassenavne  
    return (
    <select name="classes" onChange={onNameSelected}>
      {data.classes.map(names => (
        <option value={names.name}>
          {names.name}
        </option>
      ))}
    </select>
    );
}