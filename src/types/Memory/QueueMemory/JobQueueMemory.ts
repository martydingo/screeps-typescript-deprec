export {};
declare global {
  interface JobQueueMemory {
    [UUID: string]: {
      uuid?: string;
      jobParameters:
        | MineSourceJobParameters
        | FeedSpawnJobParameters
        | UpgradeControllerJobParameters
        | BuildConstructionSiteJobParameters;
      jobType: string;
      timeAdded: Game["time"];
      assignedCreep?: Id<Creep>;
    };
  }
}
