export {};
declare global {
  interface FeedTowerJobParameters {
    uuid?: string;
    status: string;
    towerId: Id<StructureTower>;
    room: string;
    jobType: "feedTower";
  }
}
