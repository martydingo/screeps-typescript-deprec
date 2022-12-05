export {};

declare global {
  interface RoomMonitorMemory {
    constructionSites: ConstructionSiteMonitorMemory;
    droppedResources: DroppedResourceMonitorMemory;
    sources: SourceMonitorMemory;
    structures: StructureMonitorMemory;
  }
}
