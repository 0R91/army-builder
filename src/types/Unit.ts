export type Upgrade = {
  id: number;
  name: string;
  points: number;
};

export type Unit = {
  id: number;
  name: string;
  points: number;
  category: string;
  availableUpgrades: Upgrade[];
};

export type ArmyEntry = {
  entryId: number;
  unit: Unit;
  upgrades: Upgrade[];
};
