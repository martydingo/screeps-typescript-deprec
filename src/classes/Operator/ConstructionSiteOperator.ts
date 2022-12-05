import { BuildConstructionSiteJob } from "classes/Job/BuildConstructionSiteJob";
import { creepNumbers } from "configuration/creeps/creepNumbers";

export class ConstructionSiteOperator {
  public constructor() {
    this.operateConstructionSites();
  }
  private operateConstructionSites() {
    if (Memory.rooms) {
      for (const roomName in Memory.rooms) {
        for (const constructionSiteIdString in Memory.rooms[roomName].monitoring.constructionSites) {
          const constructionSiteId: Id<ConstructionSite> = constructionSiteIdString as Id<ConstructionSite>;
          const constructionSite: ConstructionSite | null = Game.getObjectById(constructionSiteId);
          if (constructionSite) {
            const JobParameters: BuildConstructionSiteJobParameters = {
              status: "fetchingReconstructionSite",
              constructionSiteId: constructionSite.id,
              room: constructionSite.pos.roomName,
              jobType: "buildConstructionSite"
            };
            const count: number = creepNumbers[JobParameters.jobType];
            new BuildConstructionSiteJob(JobParameters, count);
          }
        }
      }
    }
  }
}
