export const creepBodyParts: { [key: number]: { [key: string]: BodyPartConstant[] } } = {
  // First level of nesting, calculated by energyCapacityAvailable, grouped by their RCL maximums.
  1: {
    // Second level is the jobType.
    mineSource: [WORK, WORK, MOVE, MOVE],
    feedSpawn: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    upgradeController: [WORK, WORK, CARRY, MOVE],
    buildConstructionSite: [WORK, WORK, CARRY, MOVE]
  },
  2: {
    // Second level is the jobType.
    mineSource: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    feedSpawn: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    upgradeController: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
    buildConstructionSite: [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, MOVE]
  }
};
