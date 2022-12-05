import { fetchBodyParts } from "common/fetchBodyParts";

export class JobQueueOperator {
  public constructor() {
    this.processJobs();
  }
  private processJobs() {
    for (const jobUUID in Memory.queues.jobs) {
      if (!Memory.queues.spawn[jobUUID]) {
        if (!this.checkCreep(jobUUID)) {
          Memory.queues.spawn[jobUUID] = {
            name: jobUUID,
            uuid: jobUUID,
            creepType: Memory.queues.jobs[jobUUID].jobType,
            bodyParts: fetchBodyParts(
              Memory.queues.jobs[jobUUID].jobType,
              Memory.queues.jobs[jobUUID].jobParameters.room
            ),
            room: Memory.queues.jobs[jobUUID].jobParameters.room,
            jobParameters: Memory.queues.jobs[jobUUID].jobParameters
          };
        }
      } else {
        if (this.checkCreep(jobUUID)) {
          delete Memory.queues.spawn[jobUUID];
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
