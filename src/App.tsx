import { FormEvent, useRef, useState } from 'react';
import './App.css'

function App() {

  const [selectedId, setSelectedId] = useState('');
  const idRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    idRef.current && setSelectedId(idRef.current.value);
  }

  return (
    <div>
      <form className='mb-3' onSubmit={handleSubmit}>
      <input className='form-control' type="number" ref={idRef}/>
      <button className="btn btn-primary my-3" type="submit">
            Search
          </button>
          </form>
      {idRef && <p>Selected ID : {selectedId}</p>}
    </div>
  )
}

export default App
