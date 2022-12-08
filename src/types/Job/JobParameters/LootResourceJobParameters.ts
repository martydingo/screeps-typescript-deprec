export {};
declare global {
  interface LootResourceJobParameters {
    uuid?: string;
    room: string;
    status: string;
    jobType: "lootResource";
  }
}
