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
              let spawnRoom = source.pos.roomName;
              if (Object.entries(source.room.memory.monitoring.structures.spawns).length > 0) {
                spawnRoom = findPath.findClosestSpawnToRoom(source.pos.roomName).pos.roomName;
              }
              const JobParameters: MineSourceJobParameters = {
                status: "fetchingResource",
                spawnRoom,
                room: source.pos.roomName,
                jobType: "mineSource",
                sourceId: source.id
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
