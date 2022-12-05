import { BaseCreep } from "classes/BaseCreep";

export class FeedSpawnCreep extends BaseCreep {
  public constructor(creep: Creep) {
    super(creep);
    this.runCreep(creep);
  }
  private runCreep(creep: Creep) {
    this.checkIfFull(creep, RESOURCE_ENERGY);
    if (creep.memory.status === "fetchingResource") {
      const droppedResourceArray: Resource<ResourceConstant>[] = [];
      Object.entries(creep.room.memory.monitoring.droppedResources)
        .filter(DroppedResource => DroppedResource[1].resourceType === RESOURCE_ENERGY)
        .forEach(([droppedResourceId]) => {
          const droppedResource = Game.getObjectById(droppedResourceId as Id<Resource<ResourceConstant>>);
          if (droppedResource) {
            droppedResourceArray.push(droppedResource);
          }
        });
      if (droppedResourceArray.length > 0) {
        const closestDroppedEnergy = creep.pos.findClosestByPath(droppedResourceArray);
        if (closestDroppedEnergy) {
          this.pickupResource(creep, closestDroppedEnergy);
        }
      }
    } else {
      if (creep.memory.status === "working") {
        const notFullSpawnObjectArray: (StructureSpawn | StructureExtension)[] = [];
        Object.entries(Memory.spawns)
          .filter(
            Spawn =>
              Game.spawns[Spawn[0]].room === creep.room &&
              Game.spawns[Spawn[0]].store[RESOURCE_ENERGY] < Game.spawns[Spawn[0]].store.getCapacity(RESOURCE_ENERGY)
          )
          .forEach(([spawnName]) => {
            const spawn = Game.spawns[spawnName];
            notFullSpawnObjectArray.push(spawn);
          });
        Object.entries(creep.room.memory.monitoring.extensions)
          .filter(([, ExtensionMemory]) => ExtensionMemory.energy < ExtensionMemory.capacity)
          .forEach(([extensionIdString]) => {
            const extensionId = extensionIdString as Id<StructureExtension>;
            const extension = Game.getObjectById(extensionId);
            if (extension) {
              notFullSpawnObjectArray.push(extension);
            }
          });
        const closestNotFullSpawnObject = creep.pos.findClosestByPath(notFullSpawnObjectArray);
        if (closestNotFullSpawnObject) {
          this.depositResource(creep, closestNotFullSpawnObject, RESOURCE_ENERGY);
        }
      }
    }
  }
}
