export {};
declare global {
  interface SpawnQueueMemory {
    [UUID: string]: {
      uuid: string;
      name: string;
      room: string;
      creepType: string;
      bodyParts: BodyPartConstant[];
      jobParameters:
        | MineSourceJobParameters
        | FeedSpawnJobParameters
        | FeedTowerJobParameters
        | UpgradeControllerJobParameters
        | BuildConstructionSiteJobParameters
        | LootResourceJobParameters;
    };
  }
}
