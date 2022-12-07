export {};
declare global {
  interface EnergyMonitorMemory {
    history: {
      [monitorTime: number]: {
        energyAvailable: number;
        energyCapacity: number;
      };
      minmumAvailableEnergy?: number;
      maximumAvailableEnergy?: number;
    };
  }
}
