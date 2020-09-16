#!/usr/bin/env node
const { start, stop } = require("../src/server");

const argv = require("yargs")
  .command(
    "stop",
    "stop mock server",
    () => {},
    (argv) => {
      stop(argv.port);
    }
  )
  .command(
    "start [folder]",
    "start server",
    (yargs) => {
      yargs.positional("folder", {
        describe: "expectation folder",
        default: "./expectations",
      });
    },
    (argv) => {
      start({ expectationsFolder: argv.folder, port: argv.port });
    }
  )
  .option("port", {
    alias: "p",
    type: "number",
    description: "port",
    default: "7777",
  }).argv;

process.on("SIGTERM", () => {
  stop(argv.port);
});
