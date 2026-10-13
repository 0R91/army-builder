import type { Faction } from '../types/Faction';
import styles from './FactionSelection.module.css';

type FactionSelectionProps = {
  onFactionSelect: (faction: Faction) => void;
};

const factions: Faction[] = ['Terran', 'Protoss', 'Zerg'];

function FactionSelection({ onFactionSelect }: FactionSelectionProps) {
  return (
    <div>
      <p>Choose your faction:</p>

      {factions.map((faction) => (
        <button key={faction} onClick={() => onFactionSelect(faction)}>
          {faction}
        </button>
      ))}
    </div>
  );
}

export default FactionSelection;
