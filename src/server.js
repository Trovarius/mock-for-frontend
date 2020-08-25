const mockserver = require("mockserver-node");
const mockServerClient = require("mockserver-client").mockServerClient;
const {
  loadJsonExpectation,
  loadJSExpectation,
} = require("./load-expectations");
const { executedExpectations, healthCheck } = require("./mock-routes");

const { PORT } = require("./config");

const start = async (expectationsFolder) => {
  mockserver
    .start_mockserver({
      serverPort: PORT,
      trace: true,
      jvmOptions: "-Dmockserver.enableCORSForAllResponses=true",
    })
    .then(async () => {
      console.log("Mock server started");
      const mockClient = mockServerClient("localhost", PORT);

      await loadJsonExpectation(expectationsFolder, mockClient);
      await loadJSExpectation(expectationsFolder, mockClient);
      await executedExpectations(mockClient);
      await healthCheck(mockClient);

      console.log("READY!!");
    })
    .catch((err) => console.error(err));
};

// do something
const stop = () => {
  mockserver.stop_mockserver({
    serverPort: PORT,
  });
};

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV) {
  start();
} else {
  module.exports = { start, stop };
}
