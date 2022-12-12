export {};
declare global {
  interface StructureMonitorMemory {
    controller?: ControllerMonitorMemory;
    spawns: SpawnMonitorMemory;
    extensions: ExtensionMonitorMemory;
    towers: TowerMonitorMemory;
    storage?: StorageMonitorMemory;
    roads: RoadMonitorMemory;
    other: {
      [structuredId: Id<Structure>]: {
        structureType: StructureConstant;
      };
    };
  }
}
