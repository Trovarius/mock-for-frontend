import path from "path";
import * as mockserver from "mockserver-node";
import { mockServerClient } from "mockserver-client";

import { loadJSExpectation, loadJsonExpectation } from "./load-expectations"
import { healthCheck } from "./mock-routes";

import config from "./config.json";

const logger = (msg) => process.stdout.write(`\n -> ${msg}`);

export async function startServer(
  expectationsFolder: string = config.expectationsFolder,
  port: number = config.PORT
) {
  const expectionsFolderFullPath = path.resolve(
    process.cwd(),
    expectationsFolder
  );

  await mockserver.start_mockserver({
    serverPort: port,
    trace: true,
    jvmOptions: "-Dmockserver.enableCORSForAllResponses=true",
  });

  logger(`Mock server initialized on port ${port}`);
  logger(`Reading expectations from: ${expectionsFolderFullPath}`);

  const mockClient = mockServerClient("localhost", port);

  await healthCheck(mockClient);
  await loadJSExpectation(config.expectationsFolder, mockClient);
  await loadJsonExpectation(config.expectationsFolder, mockClient);

  logger(`Mock server up and running at http://localhost:${port}/`)
}

export async function stopServer(port: number = config.PORT) {
  try {
    await mockserver.stop_mockserver({
      serverPort: port,
    });

    process.stdout.write("\n Mock server stopped");
  } catch (error) {
    process.stdout.write("\n Error while stopping mock server", error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV) {
  startServer();
}
