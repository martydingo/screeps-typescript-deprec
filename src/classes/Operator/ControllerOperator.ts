import { UpgradeControllerJob } from "classes/Job/UpgradeControllerJob";
import { findPath } from "common/findPath";
import { creepNumbers } from "configuration/creeps/creepNumbers";

export class ControllerOperator {
  public constructor() {
    this.operateController();
  }
  private operateController() {
    if (Memory.rooms) {
      for (const roomName in Memory.rooms) {
        if (Memory.rooms[roomName].monitoring.structures.controller) {
          const controllerId: Id<StructureController> | undefined =
            Memory.rooms[roomName].monitoring.structures.controller?.id;
          if (controllerId) {
            const controller: StructureController | null = Game.getObjectById(controllerId);
            if (controller) {
              if (controller.my) {
                if (Object.entries(controller.room.memory.monitoring.structures.spawns).length > 0) {
                  const JobParameters: UpgradeControllerJobParameters = {
                    status: "fetchingResource",
                    controllerId: controller.id,
                    room: controller.pos.roomName,
                    spawnRoom: controller.pos.roomName,
                    jobType: "upgradeController"
                  };
                  const count: number = creepNumbers[JobParameters.jobType];
                  new UpgradeControllerJob(JobParameters, count);
                } else {
                  const JobParameters: UpgradeControllerJobParameters = {
                    status: "fetchingResource",
                    controllerId: controller.id,
                    spawnRoom: findPath.findClosestSpawnToRoom(controller.pos.roomName).pos.roomName,
                    room: controller.pos.roomName,
                    jobType: "upgradeController"
                  };
                  const count: number = creepNumbers[JobParameters.jobType];
                  new UpgradeControllerJob(JobParameters, count);
                }
              }
            }
          }
        }
      }
    }
  }
}
