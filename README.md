# Mock For Frontend

This package aim to help the frontend development by providing a wrapper over [mockserver](https://www.mock-server.com/) package.

# Expectations

You just gonna need to create a new folder to store your expectations, for more info in how to create expectations you can find [here](https://www.mock-server.com/mock_server/creating_expectations.html) and [here](https://github.com/mock-server/mockserver-client-node/tree/master/examples)


# How to use

Execute the following command 
```sh
$ npm i -g mock-ff
$ mock-ff ./expectations/
```

**PS:** Make sure you have the right permissions to read/write in the folder you are executing the command or mock-ff will fail.

This command will start your mockserver on port `7777`

# HeathCheck

```sh
curl --request POST --url http://localhost:7777/mockserver/healthcheck
```

# Dependencies

* JDK 11+

