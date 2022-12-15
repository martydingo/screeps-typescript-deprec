export class GameMonitor {
  public constructor() {
    this.monitorGame();
  }
  private monitorGame() {
    let curHeapSize = 0;
    if (Game.cpu.getHeapStatistics) {
      const heapStats = Game.cpu.getHeapStatistics();
      if (heapStats) {
        curHeapSize = heapStats.used_heap_size;
      }
    }
    Memory.monitoring = {
      cpu: {
        used: Game.cpu.getUsed(),
        bucket: Game.cpu.bucket
      },
      memory: curHeapSize,
      pixels: (Game.resources.pixel as number) || 0
    };
  }
}
