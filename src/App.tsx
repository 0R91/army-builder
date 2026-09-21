import { useState } from 'react';
import type { Unit } from './types/Unit.ts';

import styles from './App.module.css';

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
  const [maxPoints, setMaxPoints] = useState(1000);
  const pointLimits = [1000, 2000];

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
      <p>Minerals</p>
      {
        <div>
          {pointLimits.map((limit) => (
            <button key={limit}>{limit}</button>
          ))}
        </div>
      }
      <div>
        <p>Troops</p>

        {troops.map((trooper) => (
          <UnitCard key={trooper.id} unit={trooper} onAdd={handleClick} />
        ))}

        <p>Support</p>
        {supports.map((support) => (
          <UnitCard key={support.id} unit={support} onAdd={handleClick} />
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
        <p className={totalPoints > maxPoints ? styles.pointsOverLimit : undefined}>
          Points: {totalPoints} / {maxPoints}
        </p>
      </div>
    </>
  );
}

export default App;
