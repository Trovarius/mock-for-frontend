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
  healthCheck,
};
