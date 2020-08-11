async function executedExpectations(mockServerClient) {
  var callback = async function () {
    const executed = await mockServerClient.retrieveRecordedExpectations({});
    console.log(executed);
    return {
      statusCode: 200,
      body: JSON.stringify(executed),
    };
  };

  mockServerClient
    .mockWithCallback(
      {
        path: "/mockserver/logs",
      },
      callback
    )
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
}

async function healthCheck(mockServerClient) {
  await mockServerClient.mockAnyResponse({
    httpRequest: {
      path: "/mockserver/healthcheck",
    },
    httpResponse: {
      statusCode: 200,
      body: "Everything is working in mock server.",
    },
  });
}

module.exports = {
  executedExpectations,
  healthCheck,
};