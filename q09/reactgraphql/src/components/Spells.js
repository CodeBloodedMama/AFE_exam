import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';


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

export default function Spells({ classIndex }) {
  const selectedClass = classIndex.toLowerCase();
  console.log(selectedClass);
  const { loading, error, data } = useQuery(query, {
    variables: { index: selectedClass },
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);
  const spells = data.class.spells;

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