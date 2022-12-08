import { Log } from "classes/Log";
import { base64 } from "common/utilities/base64";

export class FeedSpawnJob {
  public JobParameters: FeedSpawnJobParameters;
  public constructor(JobParameters: FeedSpawnJobParameters, count = 1) {
    this.JobParameters = JobParameters;
    Object.entries(Memory.queues.jobs)
      .filter(
        ([, jobMemory]) =>
          jobMemory.jobParameters.jobType === this.JobParameters.jobType
      )
      .forEach(([jobUUID, jobMemory]) => {
        if (jobMemory.index > count) {
          this.deleteJob(jobUUID);
        }
      });
    if (count === 1) {
      const UUID = base64.encode(
        `${this.JobParameters.jobType}-${this.JobParameters.spawnId}-1`
      );
      this.createJob(UUID, 1);
    } else {
      let iterations = 1;
      while (iterations <= count) {
        const UUID = base64.encode(
          `${this.JobParameters.jobType}-${this.JobParameters.spawnId}-${iterations}`
        );
        this.createJob(UUID, iterations);
        iterations++;
      }
    }
  }
  private createJob(UUID: string, index: number) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Creating "FeedSpawnJob" for Spawn ID "${this.JobParameters.spawnId} with the UUID of ${UUID}"`
      );
      Memory.queues.jobs[UUID] = {
        jobParameters: {
          uuid: UUID,
          status: "fetchingResource",
          spawnId: this.JobParameters.spawnId,
          room: this.JobParameters.room,
          jobType: "feedSpawn",
        },
        index,
        jobType: "feedSpawn",
        timeAdded: Game.time,
      };
    }
  }
  private deleteJob(UUID: string) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Deleting "FeedSpawnJob" for Spawn ID "${this.JobParameters.spawnId} with the UUID of ${UUID}"`
      );
      delete Memory.queues.jobs[UUID];
    }
  }
}
