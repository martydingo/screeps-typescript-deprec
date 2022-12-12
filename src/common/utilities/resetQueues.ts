export const resetQueues = {
  resetAllQueues(): void {
    Object.entries(Memory.queues.spawn).forEach(([UUID]) => {
      delete Memory.queues.spawn[UUID];
    });
    Object.entries(Memory.queues.jobs).forEach(([UUID]) => {
      delete Memory.queues.spawn[UUID];
    });
  }
};
