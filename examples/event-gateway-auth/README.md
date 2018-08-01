# Event Gateway Authorizers

In this example, you will learn how to use an authorizer function in the Event Gateway. You will deploy a service that includes a function subscribed to a `user.created` event. An authorizer function will reject any `user.created` event that is emitted into your Event Gateway without an `Authorization` header.

For more information, see the [docs on Event Gateway authorizers](https://github.com/serverless/platform/blob/master/docs/event-gateway/configuration.md#authorizers).

## Setup

Before you start, you should have installed the [Serverless Framework](https://github.com/serverless/serverless), configured your AWS credentials, and signed up for a Serverless Platform account. Finally, you should have created your first application in the Serverless Platform.

If you haven't done this already, please read the [docs on getting started with Serverless](https://github.com/serverless/platform/blob/master/docs/getting-started.md).

## Creating your service

First, you need to create your Serverless service. Run the following command in your terminal to clone this example locally:

```bash
serverless create --template-url https://github.com/serverless/platform/tree/master/examples/event-gateway-auth --path event-gateway-auth
```

Then, change into your service directory and install the dependencies:

```bash
cd event-gateway-auth
npm install
```

Finally, update the initial lines of the `serverless.yml` file to use the `tenant` and `app` values that you created in the Serverless Platform:

```yml
# serverless.yml

service: event-gateway-auth
app: <your-app-name-here>
tenant: <your-tenant-name-here>
```

## Function handler code

This service will deploy two functions to AWS Lambda to be registered in the Event Gateway. The `main` function contains the main business logic. In this case, it will simply respond with a message containing the full event with which it was triggered. In a real application, it may store an event in a database or retrieve some data to return to the emitting client.

The `auth` function is your authorizer function. This function will be called before the `main` function. If the emitted event contains proper authorization, the `auth` function will return a response indicating that it is authorized and may proceed to the subscribed `main` function. If the emitted event does not contain proper authorization, the event will be rejected and will not be passed to the subscribed `main` function.

Open the `handler.js` file to view the function code. In particular, look at the `auth` function, shown below:

```js
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
```

This authorizer function is very basic. It checks to see if the event contained an `Authorization` header. If it does not, it rejects the event with an error message.  If the event does contain an `Authorization` header, it responds with the proper authorization information to indicate that the event is authorized. This authorization information, including the `principalId` and any additional `context` you want, will be attached to the event as it is sent to your subscribed functions. You can use the `context` to add additional metadata about the emitting client, such as a User ID, a role, or an email address.

For more information on the authorizer response shape, see the [docs on Event Gateway authorizers](https://github.com/serverless/platform/blob/master/docs/event-gateway/configuration.md#authorizers).

## Serverless.yml configuration

Before deploying, take a look at your `serverless.yml` to see how to configure the Event Gateway with the Serverless Framework.

First, look at the `functions` block at the bottom of the `serverless.yml` file, as shown below:

```yml
functions:
  auth:
    handler: handler.auth
  main:
    handler: handler.main
    events:
      - eventgateway:
          type: sync
          eventType: user.created
          path: /
          cors: true
```

In the `functions` block, you are registering the two functions discussed above. The `auth` function indicates its entrypoint function in the `handler.js` file. The `main` function indicates its entrypoint, as well as an intent to set up an `eventgateway` subscription. This subscription will be fired whenever a `user.created` event is sent to your Event Gateway on the root path (`/`).

Before configuring a subscription to an event in the Event Gateway, you need to register the event type. Registering an event type allows you to configure settings on the type as well as broadcast the available events to other users in your Event Gateway.

Look at the `custom` block of the `serverless.yml` to see event type registration:

```yml
custom:
  eventTypes:
    user.created:
      authorizer: auth
```

In this block, you are declaring one event type -- `user.created`. You are also specifying that your `auth` function should be the authorizer on this event type to protect malicious events from entering your Event Gateway.

## Deploying your service

Now, it's time to deploy your service. You can deploy your service with the following command:

```bash
serverless deploy
```

This command will create your function packages and configure them in AWS, then set up your Event Gateway configuration.

## Testing your authorizer

Now that all the configuration is set up, it's the moment of truth -- time to see if your authorizer is working.

First, emit an event into your Event Gateway without an `Authorization` header. This should return with a `403 Forbidden` error.

The following `curl` command emits an event into your Event Gateway. Your Event Gateway domain will be `https://<tenant>-<app>.slsgateway.com`. All your events should be emitted to that URL. The `curl` command indicates that it's a [CloudEvent](https://github.com/cloudevents/spec) by using the `application/cloudevents+json` Content-Type. 

```bash
EVENT_GATEWAY_APP=mytenant-myapp # Set your own tenant and app values here.

curl -i -X POST \
  https://${EVENT_GATEWAY_APP}.slsgateway.com/ \
  -H 'Content-Type: application/cloudevents+json' \
  -d '{
    "eventID": "1",
    "eventType": "user.created",
    "cloudEventsVersion": "0.1",
    "source": "/services/users",
    "contentType": "application/json",
    "data": {
      "userID": "foo"
    }
}'
```

This should result in a `403 Forbidden` status code in your terminal.

Now, edit the `curl` command to include an `Authorization` header. You can use the following command:

```bash
EVENT_GATEWAY_APP=mytenant-myapp # Set your own tenant and app values here.

curl -i -X POST \
  https://${EVENT_GATEWAY_APP}.slsgateway.com/ \
  -H 'Authorization: Bearer mytoken' \
  -H 'Content-Type: application/cloudevents+json' \
  -d '{
    "eventID": "1",
    "eventType": "user.created",
    "cloudEventsVersion": "0.1",
    "source": "/services/users",
    "contentType": "application/json",
    "data": {
      "userID": "foo"
    }
}'
```

This will return a `200 OK` status code with the payload from your Lambda function:

```json
{
  "message": "You authorized successfully!",
  "input": {
    "eventType": "user.created",
    "cloudEventsVersion": "0.1",
    "source": "/services/users",
    "eventID": "1",
    "extensions": {
      "eventgateway": {
        "authorization": {
          "principalId": "myPrincipalId",
          "context": {
            "token": "mytoken"
          }
        }
      }
    },
    "contentType": "application/json",
    "data": {
      "userID": "foo"
    }
  }
}
```

The response returns the event that was received by your Lambda function. Notice in the `extensions` block that it contains the `principalId` and `context` from your authorizer function, allowing you to share valuable authorization information with the downstream subscribing functions.

## Multiple subscriptions

You can configure multiple Event Gateway subscriptions to a single event type, including subscriptions in a different service. The authorizer function will be run once, when the event is received, regardless of the number of downstream subscriptions. This decouples subscriptions from the logic of the producing client.

