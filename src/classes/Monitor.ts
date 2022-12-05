import { RoomMonitor } from "./Monitor/RoomMonitor";
import { SpawnMonitor } from "./Monitor/SpawnMonitor";

export class Monitor {
  public constructor() {
    this.initializeMonitorMemory();
    this.runRoomMonitors();
    this.runSpawnMonitors();
  }
  private runSpawnMonitors(): void {
    Object.entries(Game.spawns).forEach(([spawnName]) => {
      new SpawnMonitor(spawnName);
    });
  }
  private runRoomMonitors(): void {
    Object.entries(Game.rooms).forEach(([roomName]) => {
      new RoomMonitor(roomName);
    });
  }
  private initializeMonitorMemory(): void {
    if (!Memory.monitoring) {
      Memory.monitoring = {};
    }
  }
}
