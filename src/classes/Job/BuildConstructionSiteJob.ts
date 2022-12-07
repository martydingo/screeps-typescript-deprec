import { Log } from "classes/Log";
import { base64 } from "common/utilities/base64";

export class BuildConstructionSiteJob {
  public JobParameters: BuildConstructionSiteJobParameters;
  public constructor(JobParameters: BuildConstructionSiteJobParameters, count = 1) {
    this.JobParameters = JobParameters;
    if (count === 1) {
      const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.room}-1`);
      this.createJob(UUID, 1);
    } else {
      let iterations = 1;
      while (iterations <= count) {
        const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.room}-${iterations}`);
        this.createJob(UUID, iterations);
        iterations++;
      }
    }
  }
  private createJob(UUID: string, index: number) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Creating "BuildConstructionSiteJob" for room: "${this.JobParameters.room}" with the UUID "${UUID}"`
      );
      Memory.queues.jobs[UUID] = {
        jobParameters: {
          uuid: UUID,
          status: "fetchingResource",
          room: this.JobParameters.room,
          jobType: "buildConstructionSite"
        },
        index,
        jobType: "buildConstructionSite",
        timeAdded: Game.time
      };
    }
  }
}
