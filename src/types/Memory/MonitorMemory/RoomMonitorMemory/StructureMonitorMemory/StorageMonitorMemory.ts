export {};
declare global {
  interface StorageMonitorMemory {
    [storageId: Id<StructureStorage>]: {
      resources: {
        [resourceName: string]: {
          amount: number;
        };
      };
      structure: {
        hits: number;
        hitsMax: number;
      };
    };
  }
}
