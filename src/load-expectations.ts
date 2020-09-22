import recursive from "recursive-readdir";
import fs from "fs";
import path, { resolve } from "path";
import { MockServerClient } from "mockserver-client/mockServerClient";

interface HttpRequest {
  path: string;
}

interface Expectation {
  httpRequest: HttpRequest;
  specUrlOrPayload: string;
}

async function recursiveDir(path: string, format: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    recursive(path, [format], async function (err, files) {
      if (err) return reject(err);

      resolve(files);
    });
  });
}

async function readFile(path): Promise<Expectation[]> {
  return new Promise((resolve, reject) => {
    // console.log(path);
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        console.log(`Read file error (${path}): ${err}`);
        return reject(err);
      }

      const inJson = JSON.parse(data);
      resolve(inJson);
    });
  });
}

export async function loadJsonExpectation(
  source: string,
  mockServerClient: MockServerClient
): Promise<void> {
  const files = await recursiveDir(source, "*.js");

  let expectations: Expectation[] = [];

  for (const key of files) {
    const jsonFile = await readFile(key);

    for (const exp of jsonFile) {
      if (jsonFile[0].specUrlOrPayload) {
        await mockServerClient.openAPIExpectation({ ...jsonFile[0] });
      } else {
        expectations.push(exp);
      }
    }
    // expectations = [...expectations, ...jsonFile];
  }

  for (const expectation of expectations) {
    await mockServerClient.mockAnyResponse(expectation);
    process.stdout.write(
      `\n -> Expectation for path: ${expectation.httpRequest.path}`
    );
  }
}

export async function loadJSExpectation(
  source: string,
  mockServerClient: MockServerClient
) {
  const files = await recursiveDir(source, "*.json");

  for (const key of files) {
    process.stdout.write(`\n -> Expectation from file: ${key}`);
    const expectation = require(path.resolve(key));
    expectation(mockServerClient);
  }
}
