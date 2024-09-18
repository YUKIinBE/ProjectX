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

  // useRef pour stocker les données du champ de saisie
  const idRef = useRef<HTMLInputElement>(null);

  // useState pour stocker des données qui peuvent changer avec le temps
  // Lorsqu'il y a un changement, cela déclenche un re-render
  const [selectedId, setSelectedId] = useState<number>();
  const [users, setUsers] = useState<User[]>([])

  // useEffect pour exécuter des actions asynchrones qui peuvent affecter d'autres composants
  useEffect(() => {
    // axios est une bibliothèque JS populaire pour effectuer des requêtes HTTP
    axios
    // "get" une promesse à partir de l'URL et "then" exécuter une action avec la "réponse (= promesse)"
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        // Tant que la référence est la même, setState considère qu'il n'y a pas de changement. Pour indiquer le changement dans un tableau ou un objet, nous devons créer un nouveau tableau et copier ce qu'il y avait à l'intérieur en faisant [...oldArray]
        setUsers([...response.data])
      })
  })

  const handleSubmit = (event: FormEvent) => {
    // Par défaut, React rafraîchit la page lorsque le bouton de soumission est cliqué. Pour empêcher cela, nous utilisons preventDefault()
    event.preventDefault();
    // A && B signifie que si A n'est pas null ou undefined, exécute B
    // Ref.current.value est un string. Pour stocker dans une variable de type nombre, nous devons convertir en ajoutant "+" devant.
    idRef.current && setSelectedId(+idRef.current.value);
  }

  return (
    <div>
      <h1 className='text-center m-3'>User</h1>
      {/* 
      // onSubmit définit une action à exécuter lorsque le bouton est cliqué.
      // Attention, il n'y a pas de () après le nom de la méthode
      */}
      <form className='mb-3' onSubmit={handleSubmit}>
        {/* 
        // ref obtient la valeur d'entrée et l'affecte au Ref hook indiqué
        */}
        <input className='form-control' type="number" ref={idRef} />
        <button className="btn btn-primary my-3" type="submit">
          Search
        </button>
      </form>
      {idRef && <p className='fw-bold'>Selected ID : {selectedId}</p>}
      <div className='grid-container'>
      {/* 
      // A && B signifie que si A n'est pas null ou undefined, exécute B
      */}
        {selectedId && users &&
        // map() est comme un forEach. (pour chaque utilisateur) => {exécute une action}
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
