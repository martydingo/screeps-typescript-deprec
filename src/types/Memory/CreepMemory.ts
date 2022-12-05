export {};

declare global {
  export interface CreepMemory {
    status: string;
    jobType: "mineSource" | "feedSpawn" | "upgradeController" | "buildConstructionSite";
    sourceId?: Id<Source>;
    controllerId?: Id<StructureController>;
    constructionSiteId?: Id<ConstructionSite>;
    room?: string;
  }
}
