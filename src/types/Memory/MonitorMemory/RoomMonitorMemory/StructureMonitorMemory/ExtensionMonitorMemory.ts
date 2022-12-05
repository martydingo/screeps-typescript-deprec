export {};
declare global {
  interface ExtensionMonitorMemory {
    [id: Id<StructureExtension>]: {
      energy: number;
      capacity: number;
    };
  }
}
