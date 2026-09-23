export type Unit = {
  id: number;
  name: string;
  points: number;
  category: string;
};

export type ArmyEntry = {
  entryId: number;
  unit: Unit;
};
