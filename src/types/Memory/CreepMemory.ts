export {};

declare global {
  export interface CreepMemory {
    status: string;
    jobType:
      | "mineSource"
      | "feedSpawn"
      | "feedTower"
      | "upgradeController"
      | "buildConstructionSite"
      | "lootResource";
    sourceId?: Id<Source>;
    towerId?: Id<StructureTower>;
    controllerId?: Id<StructureController>;
    room?: string;
  }
}
