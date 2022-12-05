export function creepPriority(room: Room): { [creepType: string]: number } {
  let priority = {
    feedSpawn: 1,
    mineSource: 2,
    upgradeController: 3,
    buildConstructionSite: 4
  };
  if (room) {
    if (Object.entries(room.memory.monitoring.droppedResources).length === 0) {
      priority = {
        feedSpawn: priority.mineSource,
        mineSource: priority.feedSpawn,
        upgradeController: priority.upgradeController,
        buildConstructionSite: priority.buildConstructionSite
      };
    }
  }
  return priority;
}
