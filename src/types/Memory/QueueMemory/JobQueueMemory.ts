export {};
declare global {
  interface JobQueueMemory {
    [UUID: string]: {
      uuid?: string;
      index: number;
      jobParameters:
        | MineSourceJobParameters
        | FeedSpawnJobParameters
        | FeedTowerJobParameters
        | UpgradeControllerJobParameters
        | BuildConstructionSiteJobParameters
        | LootResourceJobParameters
        | ScoutRoomJobParameters
        | ClaimRoomJobParameters
        | ReserveRoomJobParameters;
      jobType: string;
      timeAdded: Game["time"];
      assignedCreep?: Id<Creep>;
      room: string;
    };
  }
}
