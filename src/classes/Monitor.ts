import { RoomMonitor } from "./Monitor/RoomMonitor";

export class Monitor {
  public constructor() {
    this.runRoomMonitors();
  }

  private runRoomMonitors(): void {
    Object.entries(Game.rooms).forEach(([roomName]) => {
      new RoomMonitor(roomName);
    });
  }
}
