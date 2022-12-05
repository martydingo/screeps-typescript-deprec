import { BaseCreep } from "classes/BaseCreep";

export class SourceMinerCreep extends BaseCreep {
  public constructor(creep: Creep) {
    super(creep);
    this.runCreep(creep);
  }
  private runCreep(creep: Creep) {
    if (creep.memory.sourceId) {
      const source = Game.getObjectById(creep.memory.sourceId);
      if (source) {
        this.harvestSource(creep, source);
      }
    }
  }
}
