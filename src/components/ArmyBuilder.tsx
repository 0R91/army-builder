import { useRef, useState } from 'react';
import type { Faction } from '../types/Faction';
import type { ArmyEntry, Unit } from '../types/Unit';
import { zergUnits } from '../data/zergUnits';
import { protossUnits } from '../data/protossUnits';
import { terranUnits } from '../data/terranUnits';
import styles from '../App.module.css';
import UnitCard from './UnitCard';

type ArmyBuilderProps = {
  faction: Faction;
};

const pointLimits = [1000, 2000];

function ArmyBuilder({ faction }: ArmyBuilderProps) {
  const availableUnits =
    faction === 'Zerg' ? zergUnits : faction === 'Protoss' ? protossUnits : terranUnits;

  const [army, setArmy] = useState<ArmyEntry[]>([]);
  const [maxPoints, setMaxPoints] = useState(2000);

  const nextEntryId = useRef(1);

  const heroUnits = availableUnits.filter((unit) => unit.category === 'Hero');
  const coreUnits = availableUnits.filter((unit) => unit.category === 'Core');
  const supportUnits = availableUnits.filter((unit) => unit.category === 'Support');
  const eliteUnits = availableUnits.filter((unit) => unit.category === 'Elite');
  const airUnits = availableUnits.filter((unit) => unit.category === 'Air');

  const groupedUnits = army.reduce<{ armyEntry: ArmyEntry; quantity: number }[]>(
    (groups, armyEntry) => {
      const matchingGroup = groups.find((group) => {
        if (group.armyEntry.unit.id !== armyEntry.unit.id) {
          return false;
        }

        const groupUpgradeIds = group.armyEntry.upgrades.map((upgrade) => upgrade.id).sort();

        const armyEntryUpgradeIds = armyEntry.upgrades.map((upgrade) => upgrade.id).sort();

        return (
          groupUpgradeIds.length === armyEntryUpgradeIds.length &&
          groupUpgradeIds.every((upgradeId, index) => upgradeId === armyEntryUpgradeIds[index])
        );
      });

      if (matchingGroup) {
        matchingGroup.quantity++;
      } else {
        groups.push({
          armyEntry: armyEntry,
          quantity: 1,
        });
      }

      return groups;
    },
    []
  );

  const totalPoints = army.reduce((total, armyEntry) => {
    return total + armyEntry.unit.points;
  }, 0);

  function handleAddUnit(unit: Unit) {
    const newArmyEntry = {
      entryId: nextEntryId.current,
      unit: unit,
      upgrades: [],
    };

    setArmy([...army, newArmyEntry]);
    nextEntryId.current++;
  }

  function handleRemoveUnit(unitName: string) {
    const armyEntryToRemove = army.find((armyEntry) => armyEntry.unit.name === unitName);

    if (!armyEntryToRemove) {
      return;
    }

    const updatedArmy = army.filter((armyEntry) => armyEntry.entryId !== armyEntryToRemove.entryId);

    setArmy(updatedArmy);
  }

  return (
    <>
      <div>Army Builder</div>
      <p>{faction}</p>

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
        <p>Hero</p>
        {heroUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onAdd={handleAddUnit} />
        ))}

        <p>Core</p>
        {coreUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onAdd={handleAddUnit} />
        ))}

        <p>Support</p>
        {supportUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onAdd={handleAddUnit} />
        ))}

        <p>Elite</p>
        {eliteUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onAdd={handleAddUnit} />
        ))}

        <p>Air</p>
        {airUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onAdd={handleAddUnit} />
        ))}
      </div>

      <div>
        <p>My Army</p>

        {groupedUnits.map(({ armyEntry, quantity }) => (
          <div key={armyEntry.entryId}>
            <p>
              {quantity}x {armyEntry.unit.name}
            </p>

            <button onClick={() => handleRemoveUnit(armyEntry.unit.name)}>-</button>
          </div>
        ))}

        <p className={totalPoints > maxPoints ? styles.pointsOverLimit : undefined}>
          Points: {totalPoints} / {maxPoints}
        </p>
      </div>
    </>
  );
}

export default ArmyBuilder;
