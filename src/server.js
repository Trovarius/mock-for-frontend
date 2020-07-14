const mockserver = require("mockserver-node");
const { PORT } = require("./config");

const start = async () => {
  mockserver
    .start_mockserver({
      serverPort: PORT,
      trace: true,
    })
    .then(async () => {
      console.log("Mock server started");
      const { loadExpectation } = require("./load-expectations");
      await loadExpectation();
    });
};

// do something
const stop = () => {
  mockserver.stop_mockserver({
    serverPort: PORT,
  });
};

module.exports = {
  start,
  stop,
};
