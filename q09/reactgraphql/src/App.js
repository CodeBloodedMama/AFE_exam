import './App.css';
import { useState } from 'react';
import Classes from './components/Classes';
import Spells from './components/Spells';

function App() {
  const [selectedName, setSelectedName] = useState(null);

  function onNameSelected( {target} ) {
    setSelectedName(target.value);
  }

  return (
    <div className='container'>
       <h2>React GraphQL</h2>
       <Classes onNameSelected={onNameSelected} />
       <div>
        {selectedName && <Spells classIndex={selectedName}/>}
       </div>
    </div>
  );
}

export default App;
