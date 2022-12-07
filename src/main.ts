import { Log } from "classes/Log";
import { Monitor } from "classes/Monitor";
import { Operator } from "classes/Operator";
import { Queue } from "classes/Queue";
import { errorMapper } from "common/utilities/errorMapper";
import { garbageCollect } from "common/utilities/garbageCollect";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = errorMapper.wrapLoop(() => {
  Log.Informational(`Current game tick is ${Game.time}`);
  garbageCollect.creeps();
  new Monitor();
  new Queue();
  new Operator();
});
