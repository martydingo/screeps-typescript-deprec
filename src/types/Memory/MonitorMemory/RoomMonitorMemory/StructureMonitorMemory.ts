export {};
declare global {
  interface StructureMonitorMemory {
    controller?: ControllerMonitorMemory;
    spawns: SpawnMonitorMemory;
    extensions: ExtensionMonitorMemory;
    towers: TowerMonitorMemory;
    storage?: StorageMonitorMemory;
    roads: RoadMonitorMemory;
    links: LinkMonitorMemory;
    other: {
      [structuredId: Id<Structure>]: {
        structureType: StructureConstant;
      };
    };
  }
}
