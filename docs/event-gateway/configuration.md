# Event Gateway Configuration

This document is about configuring the various features of the Event Gateway. It is focused on the hosted Event Gateway provided by Serverless, Inc., the [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin) for the Serverless Framework, and the [Event Gateway SDK](https://github.com/serverless/event-gateway-sdk) for Javascript.

Before reading this, it is helpful to be familiar with the [basic concepts](./basic-concepts.md) of the Event Gateway.

# Table of Contents

- [Setup](#setup)
  - [Platform and Event Gateway URL](#platform-and-event-gateway-url)
  - [Event Gateway plugin](#event-gateway-plugin)
  - [Event Gateway SDK](#event-gateway-sdk)
- [Event Types](#event-types)
- [Functions](#functions)
  - [Authorizers](#authorizers)
  - [Connector Functions](#connector-functions)
     - [AWS SQS](#aws-sqs)
     - [Amazon Kinesis](#amazon-kinesis)
     - [Amazon Kinesis Firehose](#amazon-kinesis-firehose)
- [Subscriptions](#subscriptions)
  - [The `http.request` event type](#the-http-request-event-type)
  - [Sync vs. async](#sync-vs-async)
  - [CORS](#cors)
- [Emitting events](#emitting-events)

# Setup

This section contains information on configuring the Event Gateway using the Event Gateway plugin for the Serverless Framework and the Event Gateway SDK for Javascript.

## Platform and Event Gateway URL

To use the Event Gateway provided by Serverless, Inc., you should have a Serverless Platform account. [Read the docs](../getting-started.md) on getting started with the Serverless Platform.

Within the Serverless Platform, you will create an Application. Each Application is a collection of Services, and each Service is a collection of functions, subscriptions, and events. The Application is a top-level container -- events can be shared within an Application. A Service is an independently-deployable portion of your Application.

Each Application in the Serverless Platform will get a unique URL for emitting events into the Event Gateway. The structure of the URL is:

```
https://<tenant>-<application>.slsgateway.com
```

For example, if your Tenant was named "Acme", and your Application was "MainApp", your Event Gateway URL would be:

```
https://acme-mainapp.slsgateway.com
```

You can find your Event Gateway URL in the [Serverless Dashboard](https://dashboard.serverless.com).

## Event Gateway plugin

The [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin) for the Serverless Framework is the fastest way to configure the Event Gateway with Serverless functions.

To install the Event Gateway plugin, run the following command in your Serverless service directory:

```bash
$ npm install --save-dev @serverless/serverless-event-gateway-plugin
```

In your `serverless.yml`, you'll need to include the following Event Gateway configuration:

```
tenant: <your-tenant-name>
app: <your-app-name>

plugins:
  - @serverless/serverless-event-gateway-plugin
```

Be sure to replace the values for `tenant` and `app` with your Tenant and App name. See the section on [Platform and Event Gateway URL](#platform-and-event-gateway-url) to get your Tenant and App name.

The Event Gateway plugin will configure any functions that have an `eventgateway` event subscription. For example, the following `functions` block would configure a synchronous HTTP subscription to your `createUser` function when making a `POST` request to `/users`:

```yml
functions:
  createUser:
    handler: handler.createUser
    events:
      - eventgateway
          type: sync
          eventType: http.request
          path: /users
          method: POST
```

For more on configuring the Event Gateway with the Event Gateway plugin, see the [Event Types](#event-types), [Functions](#functions], and [Subscriptions](#subscriptions) sections below.

## Event Gateway SDK

If you want to emit events into the Event Gateway to trigger your serverless compute, the best way is to use the [Event Gateway SDK](https://github.com/serverless/event-gateway-sdk) for Javascript.

You can install the Event Gateway SDK into your project with the following command:

```bash
$ npm install --save @serverless/event-gateway-sdk
```

To use the Event Gateway SDK in your application, first configure a client using your [Event Gateway URL](#platform-and-event-gateway-url):

```javascript
const SDK = require('@serverless/event-gateway-sdk');
const eventGateway = new SDK({
  url: 'https://acme-mainapp.slsgateway.com',
})
```

Then use the Event Gateway client to emit an event into the Event Gateway:

```javascript
eventGateway
  .emit({
    eventID: '1',
    eventType: 'user.created',
    cloudEventsVersion: '0.1',
    source: '/services/users',
    contentType: 'application/json',
    data: {
      userID: 'foo'
    }
  })
```

Events that are emitted to the Event Gateway should be in [CloudEvents](https://cloudevents.io/) format. You can find the spec [here](https://github.com/cloudevents/spec/blob/master/spec.md).

For full documentation on the Event Gateway SDK, check out the [GitHub repo](https://github.com/serverless/event-gateway-sdk).

# Event Types

To configure a subscription to an event type, you will first need to register the event type with the Event Gateway.

An event type is a string that will identify a particular event as it reaches the Event Gateway. For example, `user.created` may be your event type for an event with a payload describing a new user that was created in your application.

You can register event types in the Event Gateway with the Event Gateway plugin for the Serverless Framework as follows:

```yml
custom:
  eventTypes:
    user.created:
    http.request:
```

You may also add an authorizer function to your event type to protect your Event Gateway from unwanted events. This will require that each instance of the event that is emitted into the Event Gateway must pass the defined authorization. 

You can configure authorization for your event type with the following syntax:

```yml
custom:
  eventTypes:
    user.created:
      authorizer: authFunction
    http.request:
    
functions:
  authFunction:
    handler: handler.auth
```

For more on authorizer functions, see [here](#authorizers)

# Functions

A function is the bit of compute logic that you use to react to a particular event. Functions are usually deployed to a Functions-as-a-Service (FaaS) provider, and then registered in the Event Gateway. When an event is routed to a function via a subscription, the Event Gateway will call out to the registered function to send the data to the compute.

The Serverless Framework and the Event Gateway plugin for the Serverless Framework will help you deploy functions to AWS Lambda and register those functions with the Event Gateway.

The syntax for deploying an AWS Lambda function and registering it with the Event Gateway is as follows:

```yml
functions:
  sendWelcomeEmail:
    handler: code.sendWelcomeEmail
    events:
      - eventgateway:
          type: async
          eventType: user.created
```

The Event Gateway plugin for the Serverless Framework will register any function in your `serverless.yml` that either:

* has an `eventgateway` event subscription, or
* is used as an `authorizer` for a registered [event type](#event-types).

For more on `eventgateway` event subscriptions, see [here](#subscriptions).

## Authorizers

You may use a function as an authorizer on an event type to prevent unwanted events from entering into your Event Gateway. You can configure an authorizer on an event type as follows:

```yml
custom:
  eventTypes:
    user.created:
      authorizer: authFunction
    
functions:
  authFunction:
    handler: handler.auth
```

The `authFunction` is defined in the `functions` block and then referenced by the `user.created` event type as its authorizer.

Your authorizer function will be invoked prior to any subscriptions on the event type. It will receive a JSON object payload with two fields:

- `event`, which is the CloudEvent object received by the Event Gateway.
- `request`, which is the full HTTP request to the Event Gateway.

You can use fields of the `event` or `request`, such as an `Authorization` header, to authorize the event. 

Your authorizer function should respond to the authorization request with a JSON object.

If the event passes authorization and you would like to pass it along to any subscribed functions, your response object should contain an `authorization` key. The value for this key is an object with two keys: `principalId`, which is a string for identifying the principal user that sent the request, and `context`, which is an object with additional metadata to be passed to downstream subscribers.

Example of a successful authorization response:

```json
{
  "authorization": {
    "principalId": "12345",
    "context": {
      "username": "my-user",
      "role": "Admin"
    }
  }
}
```

If the event does not pass authorization and you would like to reject it, your response object should contain an `error` key. The value for this key is an object with a `message` field that will be returned to the user.

Example of an unsuccessful authorization response:

```json
{
  "error": {
    "message": "Invalid token."
  }
}
```

## Connector Functions

In the function examples above, we have shown AWS Lambda functions as the backing compute for your function logic. However, for certain logic tasks, you may just be piping events from one system into another. For example, you may want to send all `user.created` events into AWS SQS for integrating with your traditional queue processing infrastructure, or you may want to pipe all `http.requests` into Amazon Kinesis Firehose for internal analytics.

Rather than writing the glue code yourself in AWS Lambda functions, you can use *connector functions* to pipe the events directly to these downstream systems.

You can configure connector functions with the Event Gateway plugin. The Event Gateway plugin will configure all needed IAM permissions for the Event Gateway to use the resource.

Connector functions are specified in the `functions` block just like AWS Lambda functions, but they have a special `type` property to indicate which type of function they are. It also includes an `inputs` object to pass configuration for the connector function.

The following is an example of configuring an AWS SQS connector function with the Event Gateway plugin for the Serverless Framework.

```yml
functions:
  sendToQueue:
    type: awssqs
    inputs:
      logicalId: myQueue
    events:
      - eventgateway:
          type: async
          eventType: "user.created"

resources:
  Resources:
    myQueue:
      Type: "AWS::SQS::Queue"
      Properties:
        QueueName: "UserCreatedEvents"
```

In this example, our function indicates it's an AWS SQS connector function by setting `type: awssqs`. In the `inputs` block, it indicates that its CloudFormation Logical ID is `myQueue`. This matches the key of the AWS SQS queue that we create in the `resources` block of `serverless.yml`. The `logicalId` key is available whenever you are creating the downstream resource directly within the same service.

If you want to utilize an existing resource, you can pass the ARN and any other required properties in the `inputs` block. For AWS SQS, this means the ARN and the Queue URL of the SQS queue:

```yml
functions:
  sendToQueue:
    type: awssqs
    inputs:
      arn: "arn:aws:sqs:us-east-1:123456789012:queue1"
      queueUrl: "https://sqs.us-east-2.amazonaws.com/123456789012/queue1"
    events:
      - eventgateway:
          type: async
          eventType: "user.created"
```

The following connector functions are available:

### AWS SQS

```
type: awssqs
```

```
inputs:
  logicalId: <logicalId of SQS Queue in resources block>

OR

inputs:
  arn: "arn:aws:sqs:us-east-1:123456789012:queue1"
  queueUrl: "https://sqs.us-east-2.amazonaws.com/123456789012/queue1"
```

This connector function sends a message with the contents of the subscribed event to an [AWS SQS](https://aws.amazon.com/sqs/) queue.

### AWS Kinesis

```
type: awskinesis
```

```
inputs:
  logicalId: <logicalId of Kinesis stream in resources block>

OR

inputs:
  arn: "arn:aws:kinesis:us-east-1:123456789012:stream/myStream"
  streamName: "myStream"
```

This connector function sends a message with the contents of the subscribed event to an [Amazon Kinesis stream](https://aws.amazon.com/kinesis/).

### AWS Kinesis Firehose

```
type: awsfirehose
```

```
inputs:
  logicalId: <logicalId of Kinesis Firehose stream in resources block>

OR

inputs:
  arn: "arn:aws:firehose:us-east-1:123456789012:deliverystream/myFirehose"
  deliveryStreamName: "myFirehose"
```

This connector function sends a message with the contents of the subscribed event to an [Amazon Kinesis Firehose stream](https://aws.amazon.com/kinesis/data-firehose/).

# Subscriptions

Now that we've covered event types and functions above, we can cover the core abstraction of the Event Gateway -- **Subscriptions**. The Event Gateway provides a centralized router for your events, and subscriptions are how you tie your data (events) to your logic (functions).

With the Event Gateway plugin for the Serverless Framework, you can add a subscription in the Event Gateway by attaching an `eventgateway` subscription to your function. 

The following example shows the basic syntax:

```yml
functions:
  sendWelcomeEmail:
    handler: handler.sendWelcomeEmail
    events:
      - eventgateway
          type: async
          eventType: user.created
```

In the `eventgateway` subscription, you'll need to specify the type of subscription ([sync vs. async](#sync-vs-async)) and the event type to which you are subscribing.

## The `http.request` event type

If your subscription is to the event type of `http.request`, you can interact with the subscription by making direct HTTP requests, just as you would any other REST API.

For example, you could set up a REST API endpoint to create a user with the following syntax:

```yml
functions:
  createUser:
    handler: handler.createUser
    events:
      - eventgateway
          type: sync
          eventType: http.request
          path: /users
          method: POST
          cors: true
```

You could consume this endpoint by sending a `POST` request to your [Event Gateway URL](#platform-and-event-gateway-url) on the path of `/users`.

## Sync vs. async

There are two types of subscriptions in the Event Gateway: synchronous and asynchronous. You should choose the type of subscription based on the type of result you want to return to the client interacting with the Event Gateway.

With a synchronous subscription, the client will receive a response from the Event Gateway with the results of the function that has been called. This is comparable to a typical REST API use case -- you may be calling a "GetUser" API endpoint that returns a user object. Alternatively, you may be consuming a "CreateUser" API endpoint that creates a user, and you want confirmation that the user was created successfully.

With an asynchronous subscription, the client will receive a response about whether the event was successfully received by the Event Gateway, but it will not receive any details about subscriptions to the event. These subscriptions are good for building a decoupled architecture -- the producing client does not need to know or care about the downstream consumers of a particular event. This is useful for broadcasting facts that happened, such as that a new user has been created or that an IoT light was turned off.

You may have infinite asynchronous subscriptions to an event type on a path, but you may only have one synchronous subscription to an event type on a path.

Here is an example `serverless.yml` that sets up three subscriptions (one sync, two async) to a single event type:

```
functions:
  createInvoice:
    handler: code.createInvoice
    events:
      - eventgateway:
          type: sync
          eventType: user.created
  sendWelcomeEmail:
    handler: code.sendWelcomeEmail
    events:
      - eventgateway:
          type: async
          eventType: user.created
  addToCRM:
    handler: code.addToCRM
    events:
      - eventgateway:
          type: async
          eventType: user.created
```

## CORS

If you're interacting with the Event Gateway from a browser, you'll need to configure CORS on your Event Gateway endpoints. You can do this with the Event Gateway plugin for the Serverless Framework.

For standard settings, you can set `cors: true`, as in the following example:

```yml
functions:
  createUser:
    handler: handler.createUser
    events:
      - eventgateway
          type: sync
          eventType: http.request
          path: /users
          method: POST
          cors: true
```

This will use the following default CORS properties:

- `Access-Control-Allowed-Origins`: ["*"]
- `Access-Control-Allowed-Methods`: [`HEAD`, `GET`, `POST`]
- `Access-Control-Allowed-Headers`: [`Origin`, `Accept`, `Content-Type`]

If you want to customize your CORS properties, you can provide a `cors` object in your `serverless.yml`:

```yml
functions:
  createUser:
    handler: handler.createUser
    events:
      - eventgateway
          type: sync
          eventType: http.request
          path: /users
          method: POST
          cors:
            origins: 
              - "*"
            methods:
              - GET
              - POST
              - OPTIONS
            headers:
              - Content-Type
              - Authorization
            allowCredentials: true
```



