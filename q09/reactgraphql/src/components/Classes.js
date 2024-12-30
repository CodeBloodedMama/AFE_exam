import { gql, useQuery } from '@apollo/client';

const query = gql`query {
  classes {
    name
  }
}`

export default function Classes({ onNameSelected}) {
    const { loading, error, data } = useQuery(query);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
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