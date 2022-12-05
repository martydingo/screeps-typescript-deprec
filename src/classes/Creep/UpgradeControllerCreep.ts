import { BaseCreep } from "classes/BaseCreep";

export class UpgradeControllerCreep extends BaseCreep {
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
        const controllerId = creep.memory.controllerId;
        if (controllerId) {
          const controller: StructureController | null = Game.getObjectById(controllerId);
          if (controller) {
            const upgradeResult = this.upgradeController(creep, controller);
          }
        }
      }
    }
  }
  private upgradeController(creep: Creep, controller: StructureController): ScreepsReturnCode {
    const upgradeResult: ScreepsReturnCode = creep.upgradeController(controller);
    if (upgradeResult === ERR_NOT_IN_RANGE) {
      const moveResult = this.moveCreep(creep, controller.pos);
      return moveResult;
    } else {
      return upgradeResult;
    }
  }
}
