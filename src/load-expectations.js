const recursive = require("recursive-readdir");
const fs = require("fs");

async function readFile(path) {
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

module.exports = async function loadExpectation(source, mockServerClient) {
  recursive(source || "./expectations", async function (err, files) {
    // `files` is an array of file paths\
    let expectations = [];

    if (err) {
      console.log(`Read dir error (${source || "./expectations"}): ${err}`);
      throw new Error(err);
    }

    for (const key of files) {
      const jsonFile = await readFile(key);
      expectations = [...expectations, ...jsonFile];
    }

    for (const expectation of expectations) {
      await mockServerClient.mockAnyResponse(expectation);
      console.log(`${expectation.httpRequest.path}`);
    }
  });
};
