import { JobQueueOperator } from "./QueueOperator/JobQueueOperator";

export class QueueOperator {
  public constructor() {
    this.runQueueOperators();
  }
  private runQueueOperators() {
    this.runJobQueueOperator();
  }
  private runJobQueueOperator() {
    new JobQueueOperator();
  }
}
