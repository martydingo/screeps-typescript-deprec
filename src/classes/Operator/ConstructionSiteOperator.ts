import { BuildConstructionSiteJob } from "classes/Job/BuildConstructionSiteJob";
import { creepNumbers } from "configuration/creeps/creepNumbers";

export class ConstructionSiteOperator {
  public constructor() {
    this.operateConstructionSites();
  }
  private cleanConstructionSiteJobs(roomName: string) {
    Object.entries(Memory.rooms[roomName].monitoring.constructionSites).forEach(([constructionSiteIdString]) => {
      const constructionSiteId = constructionSiteIdString as Id<ConstructionSite>;
      const constructionSite = Game.getObjectById(constructionSiteId);
      if (!constructionSite) {
        delete Memory.rooms[roomName].monitoring.constructionSites[constructionSiteId];
      }
    });
  }
  private createConstructionSiteJob(roomName: string) {
    const JobParameters: BuildConstructionSiteJobParameters = {
      status: "fetchingResource",
      room: roomName,
      jobType: "buildConstructionSite"
    };
    const count: number = creepNumbers[JobParameters.jobType];
    new BuildConstructionSiteJob(JobParameters, count);
  }
  private operateConstructionSites() {
    if (Memory.rooms) {
      for (const roomName in Memory.rooms) {
        this.cleanConstructionSiteJobs(roomName);
        const constructionSitesInRoom = Object.entries(Memory.rooms[roomName].monitoring.constructionSites);
        if (constructionSitesInRoom.length > 0) {
          this.createConstructionSiteJob(roomName);
        }
      }
    }
  }
}
