import { FeedSpawnJob } from "classes/Job/FeedSpawnJob";
import { Log } from "classes/Log";
import { creepNumbers } from "configuration/creeps/creepNumbers";
import { creepPriority } from "configuration/creeps/creepPriority";

export class SpawnOperator {
  public constructor() {
    this.createSpawnFeederJobs();
    this.generateRoomSpawnQueues();
    Object.entries(Game.rooms).forEach(([roomName]) => {
      this.operateSpawns(roomName);
    });
  }
  private generateRoomSpawnQueues() {
    const sortedSpawnQueue = Object.entries(Memory.queues.spawn).sort(([, spawnJobA], [, spawnJobB]) => {
      return (
        creepPriority(Game.rooms[spawnJobA.room])[spawnJobA.creepType] -
        creepPriority(Game.rooms[spawnJobB.room])[spawnJobB.creepType]
      );
    });
    if (sortedSpawnQueue.length > 0) {
      Object.entries(sortedSpawnQueue).forEach(([, roomSpawnQueue]) => {
        let roomSpawnQueueSpawnRoom = roomSpawnQueue[1].room;
        if (roomSpawnQueue[1].spawnRoom) {
          roomSpawnQueueSpawnRoom = roomSpawnQueue[1].spawnRoom;
        }
        if (!Memory.rooms[roomSpawnQueueSpawnRoom].monitoring.spawnQueue) {
          Memory.rooms[roomSpawnQueueSpawnRoom].monitoring.spawnQueue = {};
        }
        Memory.rooms[roomSpawnQueueSpawnRoom].monitoring.spawnQueue[roomSpawnQueue[0]] = roomSpawnQueue[1];
      });
    }
  }
  private operateSpawns(roomName: string) {
    const sortedRoomSpawnQueue = Object.entries(Memory.rooms[roomName].monitoring.spawnQueue);
    let spawn: StructureSpawn | null = null;
    if (sortedRoomSpawnQueue.length > 0) {
      const nextSpawnJob = sortedRoomSpawnQueue[0][1];
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
        if (spawnResult === OK) {
          delete Memory.rooms[spawnRoom].monitoring.spawnQueue[nextSpawnJob.uuid];
          delete Memory.queues.spawn[nextSpawnJob.uuid];
        }
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
        room: spawn.pos.roomName,
        jobType: "feedSpawn"
      };
      const count: number = creepNumbers[JobParameters.jobType];
      new FeedSpawnJob(JobParameters, count);
    });
  }
}
