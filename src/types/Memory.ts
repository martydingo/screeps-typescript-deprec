export {};

declare global {
  interface Memory {
    monitoring: MonitorMemory;
    queues: QueueMemory;
  }
}
