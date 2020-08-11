const mockserver = require("mockserver-node");
const mockServerClient = require("mockserver-client").mockServerClient;
const loadExpectation = require("./load-expectations");
const executedExpectations = require("./recorded");

const { PORT } = require("./config");

const start = async (expectationsFolder) => {
  mockserver
    .start_mockserver({
      serverPort: PORT,
      trace: true,
    })
    .then(async () => {
      console.log("Mock server started");
      const mockClient = mockServerClient("localhost", PORT);

      await loadExpectation(expectationsFolder, mockClient);
      await executedExpectations(mockClient);
    });
};

// do something
const stop = () => {
  mockserver.stop_mockserver({
    serverPort: PORT,
  });
};

module.exports = { start, stop };
