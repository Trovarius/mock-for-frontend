const mockServerClient = require("mockserver-client").mockServerClient;
const recursive = require("recursive-readdir");
const fs = require("fs");
const { rejects } = require("assert");

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
  recursive("./expectations", async function (err, files) {
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
      await mockServerClient("localhost", 7777).mockAnyResponse(expectation);
      console.log(`${expectation.httpRequest.path}`);
    }
  });
}

async function fallBack() {
  mockServerClient("localhost", 7777)
    .mockAnyResponse({
      httpRequest: {
        path: "/.*",
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
    })
    .then(
      function () {
        console.log(`FALLBACK`);
      },
      function (error) {
        console.log(error);
      }
    );
}

module.exports = { loadExpectation, fallBack };
