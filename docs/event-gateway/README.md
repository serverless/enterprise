# Event Gateway - Overview

Our applications, our lives, our world, can be considered a series of events, all awaiting a response.  But the average developer and organization has never had the capability to respond to these events at scale.  As a result, the ability to store, analyze, and act upon large amounts of data has been out of reach for those without significant resources.

Serverless computing (e.g. AWS Lambda) changes that. Thanks to its auto-scaling, pay-per-execution and event-driven qualities, it has never been easier and more economical to write vast amounts of logic to do *anything*.

Serverless computing democratized computing.  We created the Event Gateway to democratize data.

## Description

The Event Gateway is a new type of event router for the serverless era.  Its practical purpose is to provide an easy way to integrate your existing workloads and data with serverless compute/functions.  Its larger vision is to empower you and your organization to respond to any event that can possibly happen, with code.

The Event Gateway is designed to work with serverless Functions located on any provider or platform (e.g. AWS Lambda, Azure Functions, Google Cloud Functions, Kubernetes).  This enables you to process events wherever you'd like.

The project itself is open-source infrastructure built and maintained by us ([Serverless Inc.](https://www.serverless.com)).  You can find [its public Github repo here](https://github.com/serverless/event-gateway).  It's designed so that anyone can easily run it.

We ([Serverless Inc.](https://www.serverless.com)) also operate a hosted (aka "serverless") version of the Event Gateway, which you can use without having to worry about operating the infrastructure.

This technical documentation is focused on the hosted version of the Event Gateway.  If you'd like to learn more about the open-source project, its documentation is kept separately [here in the Github repo](https://github.com/serverless/event-gateway/tree/master/docs).  Given the hosted and open-source versions are very similar, a lot of the documentation and examples here will apply to the open-source version as well.

Lastly, many of our enterprise users operate their own instance of the Event Gateway and use it with the [Serverless Framework](https://github.com/serverless/serverless) and our [Serverless Dashboard](https://dashboard.serverless.com/).  If this is of interest to you, [contact us](https://www.serverless.com/enterprise)

## How It Works

The Event Gateway is alike many event routers.  Data is sent into the Event Gateway via HTTP and it will route that data to serverless functions via a configuration setting known as a Subscription.  

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

You can also have multiple Subscriptions that use the same Function.  For example, if you want to create a personalized experience in your application based on the user's activity, you could send those Events to a personalization Function.

```
myapp.user.page.viewed + personalizeUserExperience()
myapp.user.button.cliked + personalizeUserExperience()
myapp.user.product.purchased + personalizeUserExperience()
```

You cannot have multiple Subscriptions using the same Event and Function.  The Event Gateway will throw an error if you try to create multiple Subscriptions using the same Event and Function.

```
myapp.user.created + sendWelcomeEmail()
myapp.user.created + sendWelcomeEmail()
myapp.user.created + sendWelcomeEmail()
```

Subscriptions also offer some extra features which enable you to use them for API use-cases.  Each Subscription has a `path`, `method` and `cors` setting.

Subscriptions can call Functions in two ways:  **asynchronously** or **synchronously**.  

An **asynchronous** Subscription means when you send an Event to the Event Gateway and it routes it to the Function, the Event Gateway will not send the Function's response back to the origin/client that made the request.  You can have infinite asynchronous Subscriptions on a single Event.

Here's an example of what this looks like in Serverless Framework V.1 using the [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin):

```yaml
# serverless.yml

service: users

custom:
  eventgateway: # Get this @ dashboard.serverless.com
    url: myorg-app.slsgateway.com
    accessKey: <yourkey>
  eventTypes:
    user.created

functions:
  sendWelcomeEmail:
    handler: code.sendWelcomeEmail
    events:
      - eventgateway:
          type: async
          eventType: user.created
  addToDripCampaign:
    handler: code.addToDripCampaign
    events:
      - eventgateway:
          type: async
          eventType: user.created
  notifySalesTeam:
    handler: code.notifySalesTeam
    events:
      - eventgateway:
          type: async
          eventType: user.created

plugins:
  - "@serverless/serverless-event-gateway-plugin"
```

A **synchronous** Subscription means the Event Gateway will wait for a serverless function to process an Event and then return the response to the origin/client that published the Event.  You can use this to create a traditional request/response experience, even though it’s powered by an event-driven model.

You can use synchronous Subscriptions along with the `path` and `method` setting on the Subscription, to create a single REST API route:

```
/users/create + POST + http.request + createUser()
```

Here's what this looks like using Serverless Framework V.1 using the [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin):

```yaml
# serverless.yml

service: users

custom:
  eventgateway: # Get this @ dashboard.serverless.com
    url: myorg-app.slsgateway.com
    accessKey: <yourkey>
  eventTypes:
    http.request

functions:
  createUser:
    handler: code.createUser
    events:
      - eventgateway:
          type: sync
          eventType: http.request
          path: /users/create
          method: POST

plugins:
  - "@serverless/serverless-event-gateway-plugin"
```

What's even cooler is that you can ditch the `path`, `method` and thinking about endpoints entirely and simply use the [Event Gateway SDK](https://github.com/serverless/event-gateway-sdk) to publish synchronous Events from the client-side of your application.

Here's an example of what that looks like using Serverless Framework V.1 with the [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin) as well as the [Event Gateway SDK](https://github.com/serverless/event-gateway-sdk):

```yaml
# serverless.yml

service: users

custom:
  eventgateway: # Get this @ dashboard.serverless.com
    url: user.create.request
    accessKey: <yourkey>
  eventTypes:
    http.request

functions:
  createUser:
    handler: code.createUser
    events:
      - eventgateway:
          type: sync
          eventType: user.create.request

plugins:
  - "@serverless/serverless-event-gateway-plugin"
```

```javascript
// Event Gateway SDK running on the client side (e.g. React)

eventGateway.emit({
  eventType: ‘user.create.request’,
  data:  {
    email: ‘john@serverless.com’
  }
})
.then((response) => {
   // Response from the Function that was set to handle this Event synchronously
})
```

The great thing about this pattern is that you don’t have to worry about paths, methods or the general location of the Function that’s receiving this.  The experience is utterly simple.

Keep in mind, you can also publish Events asynchronously too from your client to do all types of user activity tracking, error logging and more.

Lastly, you can combine both **synchronous** and **asynchronous** Subscriptions on a single Event.  Here's an example using Serverless Framework V.1 and the [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin), which synchronously processes an HTTP request to create a user, while asynchronously processing the HTTP request for analytics purposes and storing it in an Event log:

```yaml
# serverless.yml

service: users-crud

custom:
  eventgateway: # Get this @ dashboard.serverless.com
    url: myorg-app.slsgateway.com
    accessKey: <yourkey>
  eventTypes:
    http.request

functions:
  createUser:
    handler: code.createUser
    events:
      - eventgateway:
          type: sync
          eventType: http.request
          path: /users/create
          method: POST
  addToAnalytics:
    handler: code.addToAnalytics
    events:
      - eventgateway:
          type: async
          eventType: http.request
          path: /users/create
          method: POST
  storeEvent:
    handler: code.storeEvent
    events:
      - eventgateway:
          type: async
          eventType: http.request
          path: /users/create
          method: POST

plugins:
  - "@serverless/serverless-event-gateway-plugin"
```
