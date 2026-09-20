import { useState } from 'react';

import UnitCard from './components/UnitCard';

function App() {
  const units: Unit[] = [
    { id: 1, name: 'Zergling', points: 40, category: 'Troop' },
    { id: 2, name: 'Roach', points: 75, category: 'Troop' },
    { id: 3, name: 'Queen', points: 150, category: 'Support' },
  ];

  const troops = units.filter((unit) => unit.category === 'Troop');

  const supports = units.filter((unit) => unit.category === 'Support');

  const [army, setArmy] = useState<Unit[]>([]);

  function handleClick(unit: Unit) {
    setArmy([...army, unit]);
  }

  function handleRemove(indexToRemove: number) {
    const updatedArmy = army.filter((_, index) => index !== indexToRemove);

    setArmy(updatedArmy);
  }

  const totalPoints = army.reduce((total, unit) => {
    return total + unit.points;
  }, 0);

  return (
    <>
      <div>Army Builder</div>
      <div>
        <p>Troops</p>

        {troops.map((trooper) => (
          <UnitCard key={trooper.id} unit={trooper} />
        ))}

        <p>Support</p>
        {supports.map((support) => (
          <div key={support.id}>
            <p>{support.name}</p>
            <p>{support.points}</p>
            <button onClick={() => handleClick(support)}>+</button>
          </div>
        ))}
      </div>
      <div>
        <p>My Army</p>
        {army.map((unit, index) => (
          <div key={index}>
            <p>{unit.name}</p>
            <button onClick={() => handleRemove(index)}>-</button>
          </div>
        ))}
        <p>Points: {totalPoints}</p>
      </div>
    </>
  );
}

export default App;
