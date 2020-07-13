var mockServerClient = require("mockserver-client").mockServerClient;
mockServerClient("localhost", 7777)
  .retrieveRecordedExpectations({})
  .then(
    function (recordedExpectations) {
      console.log(JSON.stringify(recordedExpectations));
    },
    function (error) {
      console.log(error);
    }
  );
