import { MineSourceJob } from "classes/Job/MineSourceJob";
import { creepNumbers } from "configuration/creeps/creepNumbers";

export class SourceOperator {
  public constructor() {
    this.operateSources();
  }
  private operateSources() {
    if (Memory.rooms) {
      for (const roomName in Memory.rooms) {
        for (const sourceIdString in Memory.rooms[roomName].monitoring.sources) {
          const sourceId: Id<Source> = sourceIdString as Id<Source>;
          const source: Source | null = Game.getObjectById(sourceId);
          if (source) {
            if (source.room.controller?.my) {
              const JobParameters: MineSourceJobParameters = {
                status: "fetchingResource",
                sourceId: source.id,
                room: source.pos.roomName,
                jobType: "mineSource"
              };
              const count: number = creepNumbers[JobParameters.jobType];
              new MineSourceJob(JobParameters, count);
            }
          }
        }
      }
    }
  }
}
