import { Log } from "classes/Log";
import { base64 } from "common/utilities/base64";

export class FeedTowerJob {
  public JobParameters: FeedTowerJobParameters;
  public constructor(JobParameters: FeedTowerJobParameters, count = 1) {
    this.JobParameters = JobParameters;
    Object.entries(Memory.queues.jobs)
      .filter(([, jobMemory]) => jobMemory.jobParameters.jobType === this.JobParameters.jobType)
      .forEach(([jobUUID, jobMemory]) => {
        if (jobMemory.index > count) {
          this.deleteJob(jobUUID);
        }
      });
    if (count === 1) {
      const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.towerId}-1`);
      this.createJob(UUID, 1);
    } else {
      let iterations = 1;
      while (iterations <= count) {
        const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.towerId}-${iterations}`);
        this.createJob(UUID, iterations);
        iterations++;
      }
    }
  }
  private createJob(UUID: string, index: number) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Creating "FeedTowerJob" for Tower ID "${this.JobParameters.towerId} with the UUID of ${UUID}"`
      );
      Memory.queues.jobs[UUID] = {
        jobParameters: {
          uuid: UUID,
          status: "fetchingResource",
          towerId: this.JobParameters.towerId,
          room: this.JobParameters.room,
          jobType: "feedTower"
        },
        index,
        jobType: "feedTower",
        timeAdded: Game.time
      };
    }
  }
  private deleteJob(UUID: string) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Deleting "FeedTowerJob" for Tower ID "${this.JobParameters.towerId} with the UUID of ${UUID}"`
      );
      delete Memory.queues.jobs[UUID];
    }
  }
}
