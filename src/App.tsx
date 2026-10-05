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
  const zerglings = army.filter((entry) => entry.unit.name === 'Zergling');

  const unitNames = army.map((entry) => entry.unit.name);

  const unitCounts = unitNames.reduce<Record<string, number>>((counts, name) => {
    if (counts[name]) {
      counts[name]++;
    } else {
      counts[name] = 1;
    }

    return counts;
  }, {});

  const unitEntries = Object.entries(unitCounts);

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

  function handleRemove(entryName: string) {
    const findEntry = army.find((entry) => entry.unit.name === entryName);

    if (!findEntry) {
      return;
    }

    const updatedArmy = army.filter((entry) => entry.entryId !== findEntry.entryId);
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
        {unitEntries.map((entry) => (
          <div key={entry[0]}>
            <p>
              {entry[1]}x {entry[0]}
            </p>
            <button onClick={() => handleRemove(entry[0])}>-</button>
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
