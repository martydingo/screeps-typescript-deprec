export {};
declare global {
  interface FeedSpawnJobParameters {
    uuid?: string;
    status: string;
    spawnId: Id<StructureSpawn>;
    room: string;
    jobType: "feedSpawn";
  }
}
