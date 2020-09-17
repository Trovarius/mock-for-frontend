import { MockServerClient } from "mockserver-client/mockServerClient";

export async function healthCheck(mockServerClient: MockServerClient)  {
  await mockServerClient.mockAnyResponse({
    httpRequest: {
      path: "/mockserver/healthcheck",
    },
    httpResponse: {
      statusCode: 200,
      body: "Everything is working in mock server.",
    },
  });

  process.stdout.write("\n -> Healthcheck route registered at /mockserver/healthcheck")
}

