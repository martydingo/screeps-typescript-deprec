import { BuildConstructionSiteCreep } from "classes/Creep/BuildConstructionSiteCreep";
import { FeedSpawnCreep } from "classes/Creep/FeedSpawnCreep";
import { FeedTowerCreep } from "classes/Creep/FeedTowerCreep";
import { SourceMinerCreep } from "classes/Creep/SourceMinerCreep";
import { UpgradeControllerCreep } from "classes/Creep/UpgradeControllerCreep";

export class CreepOperator {
  public constructor() {
    this.runCreeps();
  }
  private runCreeps() {
    this.runFeedSpawnCreeps();
    this.runSourceMinerCreeps();
    this.runFeedTowerCreeps();
    this.runUpgradeControllerCreeps();
    this.runBuildConstructionSiteCreeps();
  }
  private runSourceMinerCreeps() {
    Object.entries(Game.creeps)
      .filter(([, Creep]) => Creep.memory.jobType === "mineSource")
      .forEach(([, creep]) => {
        new SourceMinerCreep(creep);
      });
  }
  private runFeedSpawnCreeps() {
    Object.entries(Game.creeps)
      .filter(([, Creep]) => Creep.memory.jobType === "feedSpawn")
      .forEach(([, creep]) => {
        new FeedSpawnCreep(creep);
      });
  }
  private runFeedTowerCreeps() {
    Object.entries(Game.creeps)
      .filter(([, Creep]) => Creep.memory.jobType === "feedTower")
      .forEach(([, creep]) => {
        new FeedTowerCreep(creep);
      });
  }
  private runUpgradeControllerCreeps() {
    Object.entries(Game.creeps)
      .filter(([, Creep]) => Creep.memory.jobType === "upgradeController")
      .forEach(([, creep]) => {
        new UpgradeControllerCreep(creep);
      });
  }
  private runBuildConstructionSiteCreeps() {
    Object.entries(Game.creeps)
      .filter(([, Creep]) => Creep.memory.jobType === "buildConstructionSite")
      .forEach(([, creep]) => {
        new BuildConstructionSiteCreep(creep);
      });
  }
}
