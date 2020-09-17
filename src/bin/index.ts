#!/usr/bin/env node
const { startServer, stopServer } = require("../server");

const argv = require("yargs")
  .command(
    "stop",
    "stop mock server",
    () => {},
    (argv) => {
      stopServer(argv.port);
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
      startServer(argv.folder, argv.port );
    }
  )
  .option("port", {
    alias: "p",
    type: "number",
    description: "port",
    default: "7777",
  }).argv;

process.on("SIGTERM", () => {
  stopServer(argv.port);
});
