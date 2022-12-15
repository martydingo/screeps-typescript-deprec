export class LinkMonitor {
  public constructor(link: StructureLink) {
    this.initalizeLinkMonitorMemory(link);
    this.monitorLinks(link);
  }
  private initalizeLinkMonitorMemory(link: StructureLink) {
    if (!link.room.memory.monitoring.structures.links) {
      link.room.memory.monitoring.structures.links = {};
    }
  }
  private monitorLinks(link: StructureLink): void {
    if (link.room.memory.monitoring.structures.links) {
      if (link.room.memory.monitoring.structures.links[link.id]) {
        link.room.memory.monitoring.structures.links[link.id].energy = {
          energyAvailable: link.store[RESOURCE_ENERGY],
          energyCapacity: link.store.getCapacity(RESOURCE_ENERGY)
        };
      } else {
        link.room.memory.monitoring.structures.links[link.id] = {
          energy: {
            energyAvailable: link.store[RESOURCE_ENERGY],
            energyCapacity: link.store.getCapacity(RESOURCE_ENERGY)
          }
        };
      }
    }
  }
}
