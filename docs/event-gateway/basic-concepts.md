# Basic Concepts

This document describes the basic concepts of the Event Gateway:

* [Events](#events)
* [Event Types](#event-types)
* [Functions](#functions)
* [Subscriptions](#subscriptions)

## Events

An event is a bit of data indicating that something happened. Examples include:

* A message from an IoT device (*Burglar alarm triggered*);
* A status update from a browser client (*User paused video*);
* An HTTP request (*Give me the resource at the path of /users/10*)

When an event arrives in the Event Gateway, you may want to react to it in one or more ways. You use a **Subscription** (described below) to tie a particular event to a **Function** (described below).

Events in the Event Gateway are represented in [CloudEvents](https://cloudevents.io/) format.

## Event Types

Event Types describe a class of events that may be emitted into your Event Gateway. Event Types are registered in the Event Gateway to declare the kinds of events that will be emitted by your application and to allow subscriptions to tie these events to functions.

The difference between Event Types and Events is similar to that between classes and instances. The Event Type declares the name of a certain type of events that will be emitted into your application, such as `user.created` when a new User is created, or `marketing.email.sent` when Marketing sends an email. An Event is a particular instance of the Event Type. If two users are created in your application, there are two distinct Events but both have the Event Type of `user.created`.

## Functions

A function is a bit of compute to act on a particular Event. This could mean:

* handling a REST API request by reading a record from a database and responding with the results. 
* creating a thumbnail of a user-uploaded profile picture
* sending an SMS message for a particular event from an IoT device.

Functions are often custom logic that you've written using Functions-as-a-Service (FaaS) compute, such as AWS Lambda, Azure Functions, or Google Cloud Functions. It may also be any HTTP-accessible endpoint.

Sometimes you may use compute as glue to send events from one system into another. For this boilerplate logic, you can use **connector functions** in the Event Gateway to avoid writing your own FaaS functions. Connector functions send events directly to downstream systems, such as AWS SQS or AWS Kinesis. You can read more about using connector functions [here](./configuration.md#connector-functions).

## Subscriptions

Subscriptions are at the core of the Event Gateway's functionality and we've designed them to be simple yet extremely powerful.  Here's how they work:

A Subscription binds a single Event to a single serverless Function (1-to-1), like this:

```
myapp.user.created + sendWelcomeEmail()
```

You can have multiple Subscriptions that use the same Event.  For example, if you want to perform multiple actions when a user signs up for your application, create multiple Subscriptions:

```
myapp.user.created + sendWelcomeEmail()
myapp.user.created + addToDripCampaign()
myapp.user.created + notifySalesTeam()
```

Subscriptions can call Functions in two ways:  **asynchronously** or **synchronously**.  

An **asynchronous** Subscription means when you send an Event to the Event Gateway and it routes it to the Function, the Event Gateway will not send the Function's response back to the origin/client that made the request.  You can have infinite asynchronous Subscriptions on a single Event.

A **synchronous** Subscription means the Event Gateway will wait for a serverless function to process an Event and then return the response to the origin/client that published the Event.  You can use this to create a traditional request/response experience, even though it’s powered by an event-driven model.

You can use synchronous Subscriptions along with the `path` and `method` setting on the Subscription, to create a single REST API route:


```
/users/create + POST + http.request + createUser()
```

You can read more about configuring Event Types, Functions, and Subscriptions in the Event Gateway in the [Configuration](./configuration.md) document.