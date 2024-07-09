import React, { useState } from 'react'

function Character({ character }) {
  const [showHomeworld, setShowHomeworld] = useState(false);
  
  
  const toggleHomeworld = () => {
    // console.log('toggleHomeworld called');
    setShowHomeworld(prev => !prev);
  };
  
  return (
    <div className="character-card" onClick={toggleHomeworld}>
      <h3 className="character-name">{character.name}</h3>
      {showHomeworld && character.homeworld && (

      
      <p className="character-planet">Planet: {character.homeworld.name}</p>
    )}
    </div>
  )
}

export default Character
