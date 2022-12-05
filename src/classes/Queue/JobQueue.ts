export class JobQueue {
  public constructor() {
    this.initalizeJobQueueMemory();
  }
  private initalizeJobQueueMemory(): void {
    if (!Memory.queues.jobs) {
      Memory.queues.jobs = {};
    }
  }
}
