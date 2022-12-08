import { UpgradeControllerJob } from "classes/Job/UpgradeControllerJob";
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
            const controller: StructureController | null =
              Game.getObjectById(controllerId);
            if (controller) {
              if (controller.my) {
                const JobParameters: UpgradeControllerJobParameters = {
                  status: "fetchingResource",
                  controllerId: controller.id,
                  room: controller.pos.roomName,
                  jobType: "upgradeController",
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
