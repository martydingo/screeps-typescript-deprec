import { GameMonitor } from "./Monitor/GameMonitor";

export class Monitor {
  public constructor() {
    this.initializeMonitors();
  }
  private initializeMonitors() {
    new GameMonitor();
  }
}
