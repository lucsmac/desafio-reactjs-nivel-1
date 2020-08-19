import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  console.log('opan')

  useEffect(() => {
    console.log('response.data')
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('repositories', {
      title: 'Front-end com ReactJS',
      url: 'example2.com',
      techs: ['Node', 'ReactJS']
    }).then((response) => {
      const newRepository = response.data
      setRepositories([...repositories, newRepository])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((response) => console.log(response))
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
