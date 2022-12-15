export {};

declare global {
  export interface CreepMemory {
    status: string;
    jobType:
      | "mineSource"
      | "feedSpawn"
      | "feedTower"
      | "feedLink"
      | "upgradeController"
      | "buildConstructionSite"
      | "lootResource"
      | "scoutRoom"
      | "claimRoom"
      | "reserveRoom";
    sourceId?: Id<Source>;
    towerId?: Id<StructureTower>;
    controllerId?: Id<StructureController>;
    linkId?: Id<StructureLink>;
    room: string;
  }
}
