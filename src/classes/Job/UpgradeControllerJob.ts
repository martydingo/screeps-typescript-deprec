import { Log } from "classes/Log";
import { base64 } from "common/utilities/base64";

export class UpgradeControllerJob {
  public JobParameters: UpgradeControllerJobParameters;
  public constructor(JobParameters: UpgradeControllerJobParameters, count = 1) {
    this.JobParameters = JobParameters;
    Object.entries(Memory.queues.jobs)
      .filter(([, jobMemory]) => jobMemory.jobParameters.jobType === this.JobParameters.jobType)
      .forEach(([jobUUID, jobMemory]) => {
        if (jobMemory.index > count) {
          this.deleteJob(jobUUID);
        }
      });
    if (count === 1) {
      const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.controllerId}-1`);
      this.createJob(UUID, 1);
    } else {
      let iterations = 1;
      while (iterations <= count) {
        const UUID = base64.encode(`${this.JobParameters.jobType}-${this.JobParameters.controllerId}-${iterations}`);
        this.createJob(UUID, iterations);
        iterations++;
      }
    }
  }
  private createJob(UUID: string, index: number) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Creating "UpgradeControllerJob" for Controller ID: "${this.JobParameters.controllerId}" with the UUID "${UUID}"`
      );
      Memory.queues.jobs[UUID] = {
        jobParameters: {
          uuid: UUID,
          status: "fetchingResource",
          controllerId: this.JobParameters.controllerId,
          room: this.JobParameters.room,
          jobType: "upgradeController"
        },
        index,
        jobType: "upgradeController",
        timeAdded: Game.time
      };
    }
  }
  private deleteJob(UUID: string) {
    if (!Memory.queues.jobs[UUID]) {
      Log.Informational(
        `Deleting "UpgradeControllerJob" for Controller ID: "${this.JobParameters.controllerId}" with the UUID "${UUID}"`
      );
      delete Memory.queues.jobs[UUID];
    }
  }
}
