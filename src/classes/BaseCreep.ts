export class BaseCreep {
  public constructor(creep: Creep) {
    //
  }
  public moveCreep(creep: Creep, destination: RoomPosition): ScreepsReturnCode {
    const moveResult = creep.moveTo(destination);
    return moveResult;
  }
  public harvestSource(creep: Creep, source: Source): ScreepsReturnCode {
    const harvestResult = creep.harvest(source);
    if (harvestResult === ERR_NOT_IN_RANGE) {
      const moveResult = this.moveCreep(creep, source.pos);
      return moveResult;
    } else {
      return harvestResult;
    }
  }
  public pickupResource(creep: Creep, origin: Resource<ResourceConstant>): ScreepsReturnCode {
    const depositResult = creep.pickup(origin);
    if (depositResult === ERR_NOT_IN_RANGE) {
      const moveResult = this.moveCreep(creep, origin.pos);
      return moveResult;
    } else return depositResult;
  }
  public depositResource(
    creep: Creep,
    destination: Structure<StructureConstant> | AnyCreep,
    resource: ResourceConstant
  ): ScreepsReturnCode {
    const depositResult = creep.transfer(destination, resource);
    if (depositResult === ERR_NOT_IN_RANGE) {
      const moveResult = this.moveCreep(creep, destination.pos);
      return moveResult;
    } else return depositResult;
  }
  public checkIfFull(creep: Creep, resource: ResourceConstant): void {
    if (creep.memory.status === "fetchingResource") {
      if (creep.store[resource] === creep.store.getCapacity(resource)) {
        creep.memory.status = "working";
      }
    } else if (creep.memory.status === "working") {
      if (creep.store[resource] === 0) {
        creep.memory.status = "fetchingResource";
      }
    }
  }
}
