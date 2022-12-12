export {};

declare global {
  interface Memory {
    queues: QueueMemory;
    monitoring?: GameMonitorMemory;
  }
}
