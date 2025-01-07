import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';

// Render en dropdown-menu med de hentede klassenavne
const query = gql`
  query Query($index: String) {
    class(index: $index) {
      spells {
        index
        casting_time
        components
        concentration
        desc
        duration
        level
        material
        name
        range
        ritual
      }
    }
  }
`;


// Definer en React-komponent, der bruger Apollo Client til at udføre forespørgslen
export default function Spells({ classIndex }) {
  // små bogstaver
  const selectedClass = classIndex.toLowerCase();
  console.log(selectedClass);
  // Brug useQuery hook til at udføre forespørgslen og håndtere loading, error og data tilstande
  const { loading, error, data } = useQuery(query, {
    variables: { index: selectedClass },
  });
 // Vis en loading besked, mens dataene hentes
  if (loading) return <CircularProgress />;
  // Vis en fejlbesked, hvis der opstår en fejl under hentning af data
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);
  // Vis klassens navn og beskrivelse
  const spells = data.class.spells;
  // Render en dropdown-menu med de hentede klassenavne
  return (
    <>
      <h1>Class Spells</h1>
      {spells.map(spell => (
        <div key={spell.index}>
          <h3>{spell.name}</h3>
          <p>Level: {spell.level}</p>
          <p>Range: {spell.range}</p>
          <p>Components: {spell.components}</p>
          <p>Material: {spell.material}</p>
          <p>Casting Time: {spell.casting_time}</p>
          <p>Duration: {spell.duration}</p>
          <p>Concentration: {spell.concentration ? 'true' : 'false'}</p> 
          <p>Ritual: {spell.ritual ? 'true' : 'false'}</p>
          <p>Desc: {spell.desc}</p> 
        </div>
      ))}
    </>
  );
}