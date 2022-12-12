import { ConstructionSiteOperator } from "./Operator/ConstructionSiteOperator";
import { ControllerOperator } from "./Operator/ControllerOperator";
import { CreepOperator } from "./Operator/CreepOperator";
import { QueueOperator } from "./Operator/QueueOperator";
import { RoomOperator } from "./Operator/RoomOperator";
import { SourceOperator } from "./Operator/SourceOperator";
import { SpawnOperator } from "./Operator/SpawnOperator";
import { TowerOperator } from "./Operator/TowerOperator";

export class Operator {
  public constructor() {
    this.runOperators();
  }
  private runOperators() {
    this.runControllerOperator();
    this.runSourceOperator();
    this.runSpawnOperator();
    this.runTowerOperator();
    this.runQueueOperator();
    this.runCreepOperator();
    this.runConstructionSiteOperator();
    this.runRoomOperator();
  }
  private runControllerOperator() {
    new ControllerOperator();
  }
  private runSourceOperator() {
    new SourceOperator();
  }
  private runQueueOperator() {
    new QueueOperator();
  }
  private runSpawnOperator() {
    new SpawnOperator();
  }
  private runTowerOperator() {
    new TowerOperator();
  }
  private runCreepOperator() {
    new CreepOperator();
  }
  private runConstructionSiteOperator() {
    new ConstructionSiteOperator();
  }
  private runRoomOperator() {
    new RoomOperator();
  }
}
