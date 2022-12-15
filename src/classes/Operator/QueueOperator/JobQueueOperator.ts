import { fetchBodyParts } from "common/fetchBodyParts";

export class JobQueueOperator {
  public constructor() {
    this.processJobs();
  }
  private processJobs() {
    for (const jobUUID in Memory.queues.jobs) {
      let spawnRoom = Memory.queues.jobs[jobUUID].jobParameters.room;
      if (Memory.queues.jobs[jobUUID].jobParameters.spawnRoom) {
        const spawnRoomString = Memory.queues.jobs[jobUUID].jobParameters.spawnRoom;
        if (spawnRoomString) {
          spawnRoom = spawnRoomString;
        }
      }
      const desiredBodyParts = fetchBodyParts(Memory.queues.jobs[jobUUID].jobType, spawnRoom);
      // console.log(`${Memory.queues.jobs[jobUUID].jobType}: ${desiredBodyParts.toString()}`);
      if (!Memory.queues.spawn[jobUUID]) {
        if (!this.checkCreep(jobUUID)) {
          Memory.queues.spawn[jobUUID] = {
            name: jobUUID,
            uuid: jobUUID,
            creepType: Memory.queues.jobs[jobUUID].jobType,
            bodyParts: desiredBodyParts,
            room: Memory.queues.jobs[jobUUID].jobParameters.room,
            spawnRoom: Memory.queues.jobs[jobUUID].jobParameters.spawnRoom,
            jobParameters: Memory.queues.jobs[jobUUID].jobParameters
          };
        } else {
          if (this.checkCreep(jobUUID)) {
            delete Memory.queues.spawn[jobUUID];
            delete Memory.rooms[spawnRoom].monitoring.spawnQueue[jobUUID];
          } else {
            if (Memory.queues.spawn[jobUUID].bodyParts !== desiredBodyParts) {
              Memory.queues.spawn[jobUUID].bodyParts = desiredBodyParts;
            }
          }
        }
      } else {
        if (this.checkCreep(jobUUID)) {
          delete Memory.queues.spawn[jobUUID];
          delete Memory.rooms[spawnRoom].monitoring.spawnQueue[jobUUID];
        } else {
          if (Memory.queues.spawn[jobUUID].bodyParts !== desiredBodyParts) {
            Memory.queues.spawn[jobUUID].bodyParts = desiredBodyParts;
          }
        }
      }
    }
  }
  private checkCreep(UUID: string): boolean {
    if (Game.creeps[UUID]) {
      return true;
    } else {
      return false;
    }
  }
}
