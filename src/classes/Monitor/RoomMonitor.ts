import { SourceMonitor } from "./RoomMonitor/SourceMonitor";
import { use } from "../../../node_modules/typescript-mix";
import { DroppedResourceMonitor } from "./RoomMonitor/DroppedResourceMonitor";
import { ControllerMonitor } from "./RoomMonitor/Legacy/ControllerMonitor";
import { ConstructionSiteMonitor } from "./RoomMonitor/ConstructionSiteMonitor";
import { ExtensionMonitor } from "./RoomMonitor/StructureMonitor/ExtensionMonitor";
import { StructureMonitor } from "./RoomMonitor/StructureMonitor";
import { EnergyMonitor } from "./RoomMonitor/EnergyMonitor";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RoomMonitor extends SourceMonitor {}

export class RoomMonitor {
  @use(RoomMonitor, SourceMonitor) private this: any;
  public roomName: string;
  public room: Room;

  public constructor(RoomName: string) {
    this.roomName = RoomName;
    this.room = Game.rooms[RoomName];
    this.setupRoomMonitoringMemory();
    this.setupRoomMemory();
    if (this.room) {
      this.runChildMonitors();
      this.copyRoomMonitoring();
    }
  }
  private setupRoomMemory(): void {
    if (!Memory.rooms) {
      Memory.rooms = {};
    }
    if (!Memory.rooms[this.roomName]) {
      Memory.rooms[this.roomName] = {
        monitoring: {
          energy: {},
          sources: {},
          droppedResources: {},
          constructionSites: {},
          extensions: {},
          structures: {}
        }
      };
    } else if (!Memory.rooms[this.roomName].monitoring) {
      Memory.rooms[this.roomName].monitoring = {
        energy: {},
        sources: {},
        droppedResources: {},
        constructionSites: {},
        extensions: {},
        structures: {}
      };
    }
  }
  private setupRoomMonitoringMemory(): void {
    if (!Memory.monitoring[this.roomName]) {
      Memory.monitoring[this.roomName] = {
        energy: {},
        sources: {},
        spawns: {},
        spawnQueue: {},
        constructionSites: {},
        extensions: {},
        structures: {}
      };
    }
  }
  private runChildMonitors(): void {
    // this.runStructureMonitor();
    this.runEnergyMonitors();
    this.runSourceMonitors();
    this.runDroppedResourceMonitors();
    this.runConstructionSiteMonitors();
  }
  private runStructureMonitor(): void {
    if (this.room.controller) {
      new StructureMonitor(this.room);
    }
  }
  private runEnergyMonitors(): void {
    new EnergyMonitor(this.room);
  }
  private runSourceMonitors(): void {
    this.room.find(FIND_SOURCES).forEach(source => {
      new SourceMonitor(source.id);
    });
  }
  private runDroppedResourceMonitors(): void {
    new DroppedResourceMonitor(this.room);
  }
  private runConstructionSiteMonitors(): void {
    new ConstructionSiteMonitor(this.room);
  }
  private copyRoomMonitoring() {
    Memory.monitoring[this.roomName].sources = this.room.memory.monitoring.sources;
    Memory.monitoring[this.roomName].constructionSites = this.room.memory.monitoring.constructionSites;
    // Memory.monitoring[this.roomName].extensions = this.room.memory.monitoring.extensions;
    // Memory.monitoring[this.roomName].structures = this.room.memory.monitoring.structures;
  }
}
