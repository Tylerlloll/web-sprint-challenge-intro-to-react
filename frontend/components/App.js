import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(urlPeople),
      axios.get(urlPlanets)
    ])
    .then(([peopleRes, planetsRes]) => {
      const people = peopleRes.data;
      const planets = planetsRes.data;
   
      const combinedData = people.map(person => {
        const homeworldData = planets.find(planet => planet.id === person.homeworld);
        return {
          ...person,
          homeworld: homeworldData ? {
            id: homeworldData.id,
            name: homeworldData.name,
          } : null
        };
      });

      setCharacters(combinedData);
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      {characters.map(character => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
