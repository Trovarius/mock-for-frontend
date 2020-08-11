#!/usr/bin/env node
const { start, stop } = require("../src/server");

const expectationFolder = process.argv[2];

start(expectationFolder);

process.on("SIGTERM", () => {
  stop();
});

process.on("SIGINT", () => {
  stop();
});
