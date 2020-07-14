const mockServerClient = require("mockserver-client").mockServerClient;
const recursive = require("recursive-readdir");
const fs = require("fs");
const { PORT, expectationFolder } = require("./config");

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function (err, data) {
      console.log("teste log", path);
      if (err) {
        return reject(err);
      }

      const inJson = JSON.parse(data);
      resolve(inJson);
    });
  });
}

async function loadExpectation() {
  recursive(expectationFolder, async function (err, files) {
    // `files` is an array of file paths\
    let expectations = [];
    for (const key of files) {
      const jsonFile = await readFile(key);

      expectations = [...expectations, ...jsonFile];
    }

    expectations.push({
      httpRequest: {
        path: "/api",
      },
      httpForward: {
        // QA environment load balancer
        host: "randomuser.me",
        port: 443,
        scheme: "HTTPS",
      },
      times: {
        unlimited: true,
      },
    });

    for (const expectation of expectations) {
      await mockServerClient("localhost", PORT).mockAnyResponse(expectation);
      console.log(`${expectation.httpRequest.path}`);
    }
  });
}

module.exports = { loadExpectation };
