import type { Unit } from '../types/Unit.ts';

type UnitCardProps = {
  unit: Unit;
  onAdd: (unit: Unit) => void;
};

function UnitCard({ unit, onAdd }: UnitCardProps) {
  return (
    <div>
      <p>{unit.name}</p>
      <p>{unit.points}</p>
      <p>{unit.category}</p>
      <button onClick={() => onAdd(unit)}>+</button>
    </div>
  );
}

export default UnitCard;
