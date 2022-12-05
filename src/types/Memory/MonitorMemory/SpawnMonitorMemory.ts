export {};

declare global {
  export interface SpawnMonitorMemory {
    [spawnName: string]: {
      energy: {
        energy: number;
        energyCapacity: number;
      };
      structure: {
        hits: number;
        hitsMax: number;
      };
      spawning: boolean;
    };
  }
}
