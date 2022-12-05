import { Log } from "classes/Log";
import { base64 } from "common/utilities/base64";

export class FeedSpawnJob {
  public JobParameters: FeedSpawnJobParameters;
  public constructor(JobParameters: FeedSpawnJobParameters, count = 1) {
    this.JobParameters = JobParameters;
    if (count === 1) {
      const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.spawnId}-1`);
      this.createJob(UUID);
    } else {
      let iterations = 1;
      while (iterations <= count) {
        const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.spawnId}-${iterations}`);
        this.createJob(UUID);
        iterations++;
      }
    }
  }
  private createJob(UUID: string) {
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
          jobType: "feedSpawn"
        },
        jobType: "feedSpawn",
        timeAdded: Game.time
      };
    }
  }
}
