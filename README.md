# Mock For Frontend

This package aim to help the frontend development by providing a wrapper over [mockserver](https://www.mock-server.com/) package.

# Expectations

You just gonna need to create a new folder to store your expectations, for more info in how to create expectations you can find [here](https://www.mock-server.com/mock_server/creating_expectations.html) and [here](https://github.com/mock-server/mockserver-client-node/tree/master/examples)

### Sample

```json
// ./expectations/login.json
[
  {
    "httpRequest": {
      "method": "POST",
      "path": "/login"
    },
    "httpResponse": {
      "body": "token"
    }
  }
]
```

Or

```js
// ./expectations/js-sample.js
module.exports = (mockClient) => {
  mockClient
    .mockAnyResponse({
      httpRequest: {
        method: "GET",
        path: "/jssample",
      },
      httpResponse: {
        body: "EXPECTATION LOAD FROM JS FILE",
      },
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
};
```

> PS: The mock server load JSON expectation before JS expectations

# How to use

Execute the following command 
```sh
$ npm i -g mock-ff
$ mock-ff help
$ mock-ff start ./expectations/ -p 7777
$ [optional] mock-ff stop -p 7777
```


**PS:** Make sure you have the right permissions to read/write in the folder you are executing the command or mock-ff will fail.

This command will start your mockserver on port `7777`

# Useful requests

### Healthcheck
```sh
curl --request POST --url http://localhost:7777/mockserver/healthcheck
```

### Recorded Requests and Responses
```sh
curl --request PUT --url 'http://localhost:7777/mockserver/retrieve?type=REQUEST_RESPONSES'
```

# Dependencies

* JDK 11+

