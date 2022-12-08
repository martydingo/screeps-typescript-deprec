const clear = require("rollup-plugin-clear");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const screeps = require("rollup-plugin-screeps");

let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if ((cfg = require("./sensitive/screeps.dev-ts-01.json")[dest]) == null) {
  throw new Error("Invalid upload destination");
}

module.exports = {
  default: {
    input: "src/main.ts",
    output: {
      file: "dist/main.js",
      format: "cjs",
      sourcemap: false
    },

    plugins: [
      clear({ targets: ["dist"] }),
      resolve({ rootDir: "src" }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      screeps({ config: cfg, dryRun: cfg == null })
    ]
  }
};
