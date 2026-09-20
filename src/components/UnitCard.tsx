type Unit = {
  id: number;
  name: string;
  points: number;
  category: string;
};

type UnitCardProps = {
  unit: Unit;
};

function UnitCard({ unit }: UnitCardProps) {
  return (
    <div>
      <p>{unit.name}</p>
      <p>{unit.points}</p>
      <p>{unit.category}</p>
    </div>
  );
}

export default UnitCard;
