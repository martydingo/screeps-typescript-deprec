export {};
declare global {
  interface EnergyMonitorMemory {
    [monitorTime: number]: {
      energyAvailable: number;
      energyCapacity: number;
    };
  }
}
