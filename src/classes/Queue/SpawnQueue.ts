export class SpawnQueue {
  public constructor() {
    this.initalizeSpawnQueueMemory();
  }
  private initalizeSpawnQueueMemory() {
    if (!Memory.queues.spawn) {
      Memory.queues.spawn = {};
    }
  }
}
