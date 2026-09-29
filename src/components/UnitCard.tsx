import type { Unit } from '../types/Unit';

import styles from './UnitCard.module.css';

type UnitCardProps = {
  unit: Unit;
  onAdd: (unit: Unit) => void;
};

function UnitCard({ unit, onAdd }: UnitCardProps) {
  return (
    <div className={styles.unitCard}>
      <p>{unit.name}</p>
      <p>{unit.points}</p>
      <p>{unit.category}</p>
      <button onClick={() => onAdd(unit)}>+</button>
    </div>
  );
}

export default UnitCard;
