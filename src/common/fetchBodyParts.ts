import { creepBodyParts } from "configuration/creeps/creepBodyParts";

export function fetchBodyParts(creepType: string, roomName: string): BodyPartConstant[] {
  if (Game.rooms[roomName]) {
    const room: Room = Game.rooms[roomName];
    if (room.energyCapacityAvailable < 550) {
      return creepBodyParts[1][creepType];
    }
    if (room.energyCapacityAvailable >= 550) {
      let tmpAddition = 0;
      let iterations = 1;
      Object.entries(Memory.rooms[roomName].monitoring.energy).forEach(([monitorTimeString]) => {
        const monitorTimeUnknown = monitorTimeString as unknown;
        const monitorTime = monitorTimeUnknown as number;
        tmpAddition = tmpAddition + Memory.rooms[roomName].monitoring.energy[monitorTime].energyAvailable;
        iterations++;
      });
      const avgEnergy = tmpAddition / iterations;
      console.log(avgEnergy);
      if (avgEnergy <= 300) {
        return creepBodyParts[1][creepType];
      }
      return creepBodyParts[2][creepType];
    }
    return [];
  }
  return [];
}
