'use strict';

module.exports.main = (event, context, callback) => {
  console.log(event);
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "You authorized successfully!",
      input: event,
    }),
  };

  callback(null, response);
};

module.exports.auth = (event, context, callback) => {
  // Check for proper authorization here.
  let response
  if (!event.request.headers || !event.request.headers.Authorization) {
    response = {
      "error": {
        "message": "Please authenticate via an 'Authorization' header"
      }
    }
  } else {
    response = {
      "authorization": {
        "principalId": "myPrincipalId",
        "context": {
          "token": event.request.headers.Authorization.replace("Bearer ", "")
        }
      }
    }
  }
  callback(null, response);
};
