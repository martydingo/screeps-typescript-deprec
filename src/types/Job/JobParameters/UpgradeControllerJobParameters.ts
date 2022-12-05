export {};
declare global {
  interface UpgradeControllerJobParameters {
    uuid?: string;
    status: string;
    controllerId: Id<StructureController>;
    room: string;
    jobType: "upgradeController";
  }
}
