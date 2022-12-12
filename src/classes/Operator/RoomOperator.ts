import { ClaimRoomJob } from "classes/Job/ClaimRoomJob";
import { RoomMonitor } from "classes/Monitor/RoomMonitor";
import { ScoutRoomJob } from "classes/Job/ScoutRoomJob";
import { findPath } from "common/findPath";
import { roomsToClaim } from "configuration/rooms/roomsToClaim";
import { roomsToMine } from "configuration/rooms/roomsToMine";
import { ReserveRoomJob } from "classes/Job/ReserveRoomJob";
import { myScreepsUsername } from "configuration/user";

export class RoomOperator {
  public constructor() {
    const roomsToOperate: string[] = [];
    roomsToOperate.concat(roomsToMine);
    roomsToOperate.concat(roomsToClaim);
    Object.entries(Game.rooms).forEach(([roomName]) => {
      roomsToOperate.push(roomName);
    });
    //
    roomsToOperate.forEach(roomName => {
      // console.log(`${Game.time.toString()} - ${roomName}`);
      this.runRoomMonitor(roomName);
      const room = Game.rooms[roomName];
      if (room) {
        const roomController = room.controller;
        if (roomController) {
          if (roomController.my) {
            // No Room Operations Required
          } else {
            if (roomsToClaim) {
              if (roomsToClaim.includes(roomName)) {
                this.createClaimRoomJob(roomName);
              }
            }
            if (roomsToMine) {
              if (roomsToMine.includes(roomName)) {
                if (!(room.controller?.reservation?.username === myScreepsUsername)) {
                  this.createReserveRoomJob(roomName);
                }
              }
            }
          }
        }
      } else {
        this.createScoutRoomJob(roomName);
      }
    });
  }
  private runRoomMonitor(roomName: string): void {
    new RoomMonitor(roomName);
  }
  private createScoutRoomJob(roomName: string): void {
    const spawnRoom = findPath.findClosestSpawnToRoom(roomName).pos.roomName;
    const jobParameters: ScoutRoomJobParameters = {
      jobType: "scoutRoom",
      status: "movingIntoRoom",
      room: roomName,
      spawnRoom
    };
    new ScoutRoomJob(jobParameters);
  }
  private createClaimRoomJob(roomName: string): void {
    const spawnRoom = findPath.findClosestSpawnToRoom(roomName).pos.roomName;
    const jobParameters: ClaimRoomJobParameters = {
      jobType: "claimRoom",
      status: "movingIntoRoom",
      room: roomName,
      spawnRoom
    };
    new ClaimRoomJob(jobParameters);
  }
  private createReserveRoomJob(roomName: string): void {
    const spawnRoom = findPath.findClosestSpawnToRoom(roomName).pos.roomName;
    const jobParameters: ReserveRoomJobParameters = {
      jobType: "reserveRoom",
      status: "movingIntoRoom",
      room: roomName,
      spawnRoom
    };
    new ReserveRoomJob(jobParameters);
  }
}
