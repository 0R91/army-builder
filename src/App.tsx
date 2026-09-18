import { useState } from 'react';

function App() {
  const units = [
    { id: 1, name: 'Zergling', points: 40, category: 'Troop' },
    { id: 2, name: 'Roach', points: 75, category: 'Troop' },
    { id: 3, name: 'Queen', points: 150, category: 'Support' },
  ];

  const [army, setArmy] = useState([]);

  function handleClick(unit) {
    setArmy([...army, unit]);
  }

  const totalPoints = army.reduce((total, unit) => {
    return total + unit.points;
  }, 0);

  return (
    <>
      <div>Army Builder</div>
      {units.map((unit) => (
        <div key={unit.id}>
          <p>{unit.name}</p>
          <p>{unit.points}</p>
          <p>{unit.category}</p>
          <button onClick={() => handleClick(unit)}>+</button>
        </div>
      ))}

      <div>
        <p>My Army</p>
        {army.map((unit, index) => (
          <div key={index}>
            <p>{unit.name}</p>
          </div>
        ))}
        <p>Points: {totalPoints}</p>
      </div>
    </>
  );
}

export default App;
