import { BaseCreep } from "classes/BaseCreep";

export class BuildConstructionSiteCreep extends BaseCreep {
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
        const constructionSiteId = creep.memory.constructionSiteId;
        if (constructionSiteId) {
          const constructionSite: ConstructionSite | null = Game.getObjectById(constructionSiteId);
          if (constructionSite) {
            const buildResult = this.buildConstructionSite(creep, constructionSite);
          }
        }
      }
    }
  }
  private buildConstructionSite(creep: Creep, constructionSite: ConstructionSite): ScreepsReturnCode {
    const upgradeResult: ScreepsReturnCode = creep.build(constructionSite);
    if (upgradeResult === ERR_NOT_IN_RANGE) {
      const moveResult = this.moveCreep(creep, constructionSite.pos);
      return moveResult;
    } else {
      return upgradeResult;
    }
  }
}
