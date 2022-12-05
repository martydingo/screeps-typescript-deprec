import { ConstructionSiteOperator } from "./Operator/ConstructionSiteOperator";
import { ControllerOperator } from "./Operator/ControllerOperator";
import { CreepOperator } from "./Operator/CreepOperator";
import { QueueOperator } from "./Operator/QueueOperator";
import { SourceOperator } from "./Operator/SourceOperator";
import { SpawnOperator } from "./Operator/SpawnOperator";

export class Operator {
  public constructor() {
    this.runOperators();
  }
  private runOperators() {
    this.runControllerOperator();
    this.runSourceOperator();
    this.runSpawnOperator();
    this.runQueueOperator();
    this.runCreepOperator();
    this.runConstructionSiteOperator();
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
  private runCreepOperator() {
    new CreepOperator();
  }
  private runConstructionSiteOperator() {
    new ConstructionSiteOperator();
  }
}
