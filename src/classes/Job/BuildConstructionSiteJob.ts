import { Log } from "classes/Log";
import { base64 } from "common/utilities/base64";

export class BuildConstructionSiteJob {
  public JobParameters: BuildConstructionSiteJobParameters;
  public constructor(JobParameters: BuildConstructionSiteJobParameters, count = 1) {
    this.JobParameters = JobParameters;
    if (count === 1) {
      const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.constructionSiteId}-1`);
      this.createJob(UUID);
    } else {
      let iterations = 1;
      while (iterations <= count) {
        const UUID = base64.encode(
          `${this.JobParameters.jobType}-${this.JobParameters.constructionSiteId}-${iterations}`
        );
        this.createJob(UUID);
        iterations++;
      }
    }
  }
  private createJob(UUID: string) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Creating "BuildConstructionSiteJob" for Construction Site ID: "${this.JobParameters.constructionSiteId}" with the UUID "${UUID}"`
      );
      Memory.queues.jobs[UUID] = {
        jobParameters: {
          uuid: UUID,
          status: "fetchingResource",
          constructionSiteId: this.JobParameters.constructionSiteId,
          room: this.JobParameters.room,
          jobType: "buildConstructionSite"
        },
        jobType: "buildConstructionSite",
        timeAdded: Game.time
      };
    }
  }
}
