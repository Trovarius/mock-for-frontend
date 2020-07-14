const mockServerClient = require("mockserver-client").mockServerClient;
const { PORT } = require("./config");

mockServerClient("localhost", PORT)
  .retrieveRecordedExpectations({})
  .then(
    function (recordedExpectations) {
      console.log(JSON.stringify(recordedExpectations));
    },
    function (error) {
      console.log(error);
    }
  );
