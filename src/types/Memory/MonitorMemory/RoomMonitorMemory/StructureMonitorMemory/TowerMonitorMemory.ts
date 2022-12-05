export {};
declare global {
  interface TowerMonitorMemory {
    [towerId: Id<StructureTower>]: {
      energy: {
        amount: number;
        capacity: number;
      };
      structure: {
        hits: number;
        hitsMax: number;
      };
    };
  }
}
