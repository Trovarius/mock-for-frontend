var mockserver = require("mockserver-node");

const start = async () => {
  mockserver
    .start_mockserver({
      serverPort: 7777,
      trace: true,
    })
    .then(async () => {
      console.log("Mock server started");
      const { loadExpectation, fallBack } = require("./load-expectations");
      await loadExpectation();
    });
};

// do something
const stop = () => {
  mockserver.stop_mockserver({
    serverPort: 7777,
  });
};

start();
//   start,
//   stop,
// };
