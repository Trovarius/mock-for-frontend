const mockserver = require("mockserver-node");
const mockServerClient = require("mockserver-client").mockServerClient;
const path = require("path");

const {
  loadJsonExpectation,
  loadJSExpectation,
} = require("./load-expectations");
const { healthCheck } = require("./mock-routes");

const { PORT: DEFAULT_PORT } = require("./config");

const start = async ({ expectationsFolder, port }) => {
  const PORT = port || DEFAULT_PORT;

  mockserver
    .start_mockserver({
      serverPort: PORT,
      trace: true,
      jvmOptions: "-Dmockserver.enableCORSForAllResponses=true",
    })
    .then(async () => {
      console.log(`Mock server started at ${PORT}`);
      console.log(
        `Reading expectations from: ${path.resolve(
          process.cwd(),
          expectationsFolder
        )}`
      );

      const mockClient = mockServerClient("localhost", PORT);

      await loadJsonExpectation(expectationsFolder, mockClient);
      await loadJSExpectation(expectationsFolder, mockClient);
      await healthCheck(mockClient);
    })
    .catch((err) => console.error(err));
};

// do something
const stop = (port) => {
  console.log("Stopping mockserver");
  mockserver
    .stop_mockserver({
      serverPort: port || DEFAULT_PORT,
    })
    .then(() => {
      console.log("Mock server stopped");
    })
    .catch((err) => {
      console.log("Error when stopping mockserver", err);
    });
};

if (process.env.NODE_ENV) {
  start();
} else {
  module.exports = { start, stop };
}
