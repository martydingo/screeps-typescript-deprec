import { JobQueue } from "./Queue/JobQueue";
import { SpawnQueue } from "./Queue/SpawnQueue";

export class Queue {
  public constructor() {
    this.initalizeQueueMemory();
    this.runQueues();
  }
  private initalizeQueueMemory(): void {
    if (!Memory.queues) {
      Memory.queues = {
        jobs: {},
        spawn: {}
      };
    }
  }
  private runQueues(): void {
    this.runJobQueue();
    this.runSpawnQueue();
  }
  private runSpawnQueue(): void {
    new SpawnQueue();
  }
  private runJobQueue(): void {
    new JobQueue();
  }
}
