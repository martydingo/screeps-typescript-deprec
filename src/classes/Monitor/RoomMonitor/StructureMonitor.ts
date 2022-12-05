import { ControllerMonitor } from "./StructureMonitor/ControllerMonitor";
import { SpawnMonitor } from "./StructureMonitor/SpawnMonitor";

export class StructureMonitor {
  private room: Room;
  public constructor(room: Room) {
    this.room = room;
    this.monitorStructures();
  }
  private monitorStructures(): void {
    if (this.room) {
      this.room.find(FIND_STRUCTURES).forEach(Structure => {
        if (Structure.structureType === STRUCTURE_CONTROLLER) {
          new ControllerMonitor(Structure);
        } else if (Structure.structureType === STRUCTURE_SPAWN) {
          new SpawnMonitor(Structure);
        } else if (Structure.structureType === STRUCTURE_EXTENSION) {
          //
        } else if (Structure.structureType === STRUCTURE_TOWER) {
          //
        } else if (Structure.structureType === STRUCTURE_STORAGE) {
          //
        } else if (Structure.structureType === STRUCTURE_CONTAINER) {
          //
        } else if (Structure.structureType === STRUCTURE_ROAD) {
          //
        } else {
          //
        }
        // this.room.memory.monitoring.structures[Structure.id] = {
        //   structureType: Structure.structureType
        // };
      });
    }
  }
}
