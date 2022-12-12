import { FeedSpawnJob } from "classes/Job/FeedSpawnJob";
import { Log } from "classes/Log";
import { creepNumbers } from "configuration/creeps/creepNumbers";
import { creepPriority } from "configuration/creeps/creepPriority";

export class SpawnOperator {
  public constructor() {
    this.createSpawnFeederJobs();
    this.operateSpawns();
  }
  private operateSpawns() {
    const sortedSpawnQueue = Object.entries(Memory.queues.spawn).sort(([, spawnJobA], [, spawnJobB]) => {
      return (
        creepPriority(Game.rooms[spawnJobA.room])[spawnJobA.creepType] -
        creepPriority(Game.rooms[spawnJobB.room])[spawnJobB.creepType]
      );
    });
    // Object.entries(Memory.rooms).forEach(([roomName, roomMonitoring]) => {
    //   const roomSpawnQueue = Object.entries(Memory.queues.spawn).filter(
    //     (SpawnQueueEntry) => SpawnQueueEntry[1].room === roomName
    //   );
    //   roomSpawnQueue.forEach(([roomSpawnQueueUUID, roomSpawnQueueEntry]) => {
    //     Memory.monitoring[roomName].spawnQueue[roomSpawnQueueUUID] = roomSpawnQueueEntry;
    //   });
    // });
    if (sortedSpawnQueue.length > 0) {
      let spawn: StructureSpawn | null = null;
      const nextSpawnJob = sortedSpawnQueue[0][1];
      let spawnRoom = nextSpawnJob.room;
      if (nextSpawnJob.jobParameters.spawnRoom) {
        const spawnRoomString = nextSpawnJob.spawnRoom;
        if (spawnRoomString) {
          spawnRoom = spawnRoomString;
        }
      }
      const spawnObjects = Object.entries(Game.spawns).filter(
        ([, Spawn]) => Spawn.spawning === null && Spawn.pos.roomName === spawnRoom
      );
      if (spawnObjects.length > 0) {
        spawn = spawnObjects[0][1];
      }
      if (spawn) {
        const spawnResult: ScreepsReturnCode = spawn.spawnCreep(nextSpawnJob.bodyParts, nextSpawnJob.name, {
          memory: nextSpawnJob.jobParameters
        });
        Log.Debug(`Spawn result for ${nextSpawnJob.creepType} in room ${spawnRoom}: ${spawnResult}`);
      } else {
        const AllSpawnObjects = Object.entries(Game.spawns).filter(([, Spawn]) => Spawn.pos.roomName === spawnRoom);
        if (AllSpawnObjects.length < 1) {
          Log.Emergency(
            "::: !!! ::: Spawn object is null! All spawning currently halted in an error state! ::: !!! :::"
          );
          Log.Debug(`::: !!! :::  spawnRoom: ${spawnRoom} ::: !!! :::`);
          Log.Debug(`::: !!! :::  nextSpawnJob Parameters: ${JSON.stringify(nextSpawnJob)} ::: !!! :::`);
        } else {
          Log.Warning(
            `While attempting to spawn a ${nextSpawnJob.jobParameters.jobType} creep, it was discovered that all spawners in ${spawnRoom} are spawning`
          );
        }
      }
    }
  }
  private createSpawnFeederJobs() {
    Object.entries(Game.spawns).forEach(([, spawn]) => {
      const JobParameters: FeedSpawnJobParameters = {
        status: "fetchingResource",
        spawnId: spawn.id,
        room: spawn.pos.roomName,
        jobType: "feedSpawn"
      };
      const count: number = creepNumbers[JobParameters.jobType];
      new FeedSpawnJob(JobParameters, count);
    });
  }
}
