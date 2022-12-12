import { Log } from "classes/Log";
import { Operator } from "classes/Operator";
import { Queue } from "classes/Queue";
// import { errorMapper } from "common/utilities/errorMapper";
import { garbageCollect } from "common/utilities/garbageCollect";
import { resetQueues } from "common/utilities/resetQueues";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
// export const loop = errorMapper.wrapLoop(() => {

export const loop = () => {
  Log.Informational(`Current game tick is ${Game.time}`);
  garbageCollect.creeps();
  new Queue();
  new Operator();

  let curHeapSize = 0;
  if (Game.cpu.getHeapStatistics) {
    const heapStats = Game.cpu.getHeapStatistics();
    if (heapStats) {
      curHeapSize = heapStats.used_heap_size;
    }
  }
  Memory.monitoring = {
    cpu: {
      used: Game.cpu.getUsed(),
      bucket: Game.cpu.bucket
    },
    memory: curHeapSize,
    pixels: (Game.resources.pixel as number) || 0
  };

  // resetQueues.resetAllQueues();
};

// });
