import { useState, useRef, useEffect } from 'react';
import type { Unit, ArmyEntry } from './types/Unit';
import styles from './App.module.css';
import UnitCard from './components/UnitCard';

function App() {
  const units: Unit[] = [
    { id: 1, name: 'Zergling', points: 40, category: 'Troop' },
    { id: 2, name: 'Roach', points: 75, category: 'Troop' },
    { id: 3, name: 'Queen', points: 150, category: 'Support' },
  ];

  const pointLimits = [1000, 2000];

  const [army, setArmy] = useState<ArmyEntry[]>([]);
  const [maxPoints, setMaxPoints] = useState(1000);

  const nextEntryId = useRef(1);

  const troops = units.filter((unit) => unit.category === 'Troop');
  const supports = units.filter((unit) => unit.category === 'Support');

  const totalPoints = army.reduce((total, entry) => {
    return total + entry.unit.points;
  }, 0);

  function handleClick(unit: Unit) {
    const newEntry = {
      entryId: nextEntryId.current,
      unit: unit,
    };

    setArmy([...army, newEntry]);
    nextEntryId.current++;
  }

  function handleRemove(entryId: number) {
    const updatedArmy = army.filter((entry) => entry.entryId !== entryId);
    setArmy(updatedArmy);
  }

  useEffect(() => {
    console.log(army);
  }, [army]);

  return (
    <>
      <div>Army Builder</div>
      <p>Minerals</p>

      <div>
        {pointLimits.map((limit) => (
          <button
            className={limit === maxPoints ? styles.selectedPointLimit : undefined}
            key={limit}
            onClick={() => setMaxPoints(limit)}
          >
            {limit}
          </button>
        ))}
      </div>

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

        {army.map((entry) => (
          <div key={entry.entryId}>
            <p>{entry.unit.name}</p>
            <button onClick={() => handleRemove(entry.entryId)}>-</button>
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
