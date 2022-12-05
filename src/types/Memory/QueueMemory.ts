export {};
declare global {
  interface QueueMemory {
    jobs: JobQueueMemory;
    spawn: SpawnQueueMemory;
  }
}
