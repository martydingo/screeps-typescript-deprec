import { Log } from "classes/Log";
import { base64 } from "common/utilities/base64";

export class MineSourceJob {
  public JobParameters: MineSourceJobParameters;
  public constructor(JobParameters: MineSourceJobParameters, count = 1) {
    this.JobParameters = JobParameters;
    if (count === 1) {
      const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.sourceId}-1`);
      this.createJob(UUID, 1);
    } else {
      let iterations = 1;
      while (iterations <= count) {
        const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.sourceId}-${iterations}`);
        this.createJob(UUID, iterations);
        iterations++;
      }
    }
  }
  private createJob(UUID: string, index: number) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Creating "MineSourceJob" for Source ID: "${this.JobParameters.sourceId}" with the UUID "${UUID}"`
      );
      Memory.queues.jobs[UUID] = {
        jobParameters: {
          uuid: UUID,
          status: "fetchingResource",
          sourceId: this.JobParameters.sourceId,
          room: this.JobParameters.room,
          jobType: "mineSource"
        },
        index,
        jobType: "mineSource",
        timeAdded: Game.time
      };
    }
  }
}
