import { MineSourceJob } from "classes/Job/MineSourceJob";
import { findPath } from "common/findPath";
import { creepNumbers } from "configuration/creeps/creepNumbers";
import { roomsToMine } from "configuration/rooms/roomsToMine";
import { myScreepsUsername } from "configuration/user";

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
            if (source.room.controller?.my || source.room.controller?.reservation?.username === myScreepsUsername) {
              if (Object.entries(source.room.memory.monitoring.structures.spawns).length > 0) {
                const JobParameters: MineSourceJobParameters = {
                  status: "fetchingResource",
                  sourceId: source.id,
                  spawnRoom: source.pos.roomName,
                  room: source.pos.roomName,
                  jobType: "mineSource"
                };
                const count: number = creepNumbers[JobParameters.jobType];
                new MineSourceJob(JobParameters, count);
              } else {
                const JobParameters: MineSourceJobParameters = {
                  status: "fetchingResource",
                  sourceId: source.id,
                  room: source.pos.roomName,
                  spawnRoom: findPath.findClosestSpawnToRoom(source.pos.roomName).pos.roomName,
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
}
