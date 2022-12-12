export {};
declare global {
  interface MineSourceJobParameters {
    uuid?: string;
    status: string;
    sourceId: Id<Source>;
    room: string;
    spawnRoom: string;
    jobType: "mineSource";
  }
}
