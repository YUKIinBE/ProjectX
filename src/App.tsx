import { FormEvent, useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

function App() {

  const idRef = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<number>();
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers([...response.data])
      })
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    idRef.current && setSelectedId(+idRef.current.value);
  }

  return (
    <div>
      <h1 className='text-center m-3'>User</h1>
      <form className='mb-3' onSubmit={handleSubmit}>
        <input className='form-control' type="number" ref={idRef} />
        <button className="btn btn-primary my-3" type="submit">
          Search
        </button>
      </form>
      {idRef && <p className='fw-bold'>Selected ID : {selectedId}</p>}
      <div className='grid-container'>
        {selectedId && users &&
          users.map((user) => user.id === selectedId &&
            <div key={user.id}>
              <p>ID: {user.id}</p>
              <p>NAME: {user.name}</p>
              <p>EMAIL: {user.email}</p>
              <p>ADDRESS: {user.address.street}, {user.address.suite}, {user.address.zipcode}, {user.address.city}</p>
            </div>
          )}
      </div>
    </div>
  )
}

export default App
