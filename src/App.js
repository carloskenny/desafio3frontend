import React, {useState, useEffect} from "react";
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  function loadRepositories() {
    useEffect(()=>{
      api.get('repositories').then(response => {
        setRepositories(response.data);
      })
    },[]);
  }
  
  loadRepositories();


  async function handleAddRepository() {
    const response = await api.post('/repositories',
      {
        "title": "Novo Repositorio",
        "url": "www.github.com/carloskenny/ck",
        "techs": "NodeJS, ReactJS, React Native"
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
        
        
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
