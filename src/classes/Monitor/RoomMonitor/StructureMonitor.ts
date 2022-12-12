import { ControllerMonitor } from "./StructureMonitor/ControllerMonitor";
import { ExtensionMonitor } from "./StructureMonitor/ExtensionMonitor";
import { RoadMonitor } from "./StructureMonitor/RoadMonitor";
import { SpawnMonitor } from "./StructureMonitor/SpawnMonitor";
import { StorageMonitor } from "./StructureMonitor/StorageMonitor";
import { TowerMonitor } from "./StructureMonitor/TowerMonitor";

export class StructureMonitor {
  private room: Room;
  public constructor(room: Room) {
    this.room = room;
    this.monitorStructures();
  }
  private monitorStructures(): void {
    if (this.room) {
      // console.log(JSON.stringify(this.room.find(FIND_STRUCTURES)));
      this.room.find(FIND_STRUCTURES).forEach(Structure => {
        if (Structure.structureType === STRUCTURE_CONTROLLER) {
          new ControllerMonitor(Structure);
        } else if (Structure.structureType === STRUCTURE_SPAWN) {
          new SpawnMonitor(Structure);
        } else if (Structure.structureType === STRUCTURE_EXTENSION) {
          new ExtensionMonitor(Structure);
        } else if (Structure.structureType === STRUCTURE_TOWER) {
          new TowerMonitor(Structure);
        } else if (Structure.structureType === STRUCTURE_STORAGE) {
          new StorageMonitor(Structure);
        } else if (Structure.structureType === STRUCTURE_CONTAINER) {
          //
        } else if (Structure.structureType === STRUCTURE_ROAD) {
          new RoadMonitor(Structure);
        } else {
          this.room.memory.monitoring.structures.other[Structure.id] = {
            structureType: Structure.structureType
          };
        }
      });
    }
  }
}
