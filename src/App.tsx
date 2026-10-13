import { useState } from 'react';
import type { Faction } from './types/Faction';
import ArmyBuilder from './components/ArmyBuilder';
import FactionSelection from './components/FactionSelection';

function App() {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);

  function handleFactionSelection(faction: Faction) {
    setSelectedFaction(faction);
  }

  return (
    <>
      {selectedFaction ? (
        <ArmyBuilder faction={selectedFaction} />
      ) : (
        <FactionSelection onFactionSelect={handleFactionSelection} />
      )}
    </>
  );
}

export default App;
