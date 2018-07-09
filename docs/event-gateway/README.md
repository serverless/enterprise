# Event Gateway - Overview

The Event Gateway is an event router which enables you to connect your existing data and workloads to serverless compute via a simple event-driven integration pattern.

## Concepts

### Subscriptions

You can send any data into the Event Gateway via HTTP and it will route that data to serverless functions via a configuration setting known as a Subscription.  Subscriptions are at the core of the Event Gateway's functionality and we've designed them to be  simple yet extremely powerful.  Here's how they work:

A Subscription binds a single Event to a single serverless Function (1-to-1), like this:

```
myapp.user.created >>> sendWelcomeEmail()
```

You can have multiple Subscriptions that use the same Event.  For example, if you want to perform multiple actions when a user signs up for your application, create multiple Subscriptions:

```
myapp.user.created >>> sendWelcomeEmail()
myapp.user.created >>> addToDripCampaign()
myapp.user.created >>> notifySalesTeam()
```

You can also have multiple Subscriptions that use the same Function.  For example, if you want to create a personalized experience in your application based on the user's activity, you could send those Events to a personalization Function.

```
myapp.user.page.viewed >>> personalizeUserExperience()
myapp.user.button.cliked >>> personalizeUserExperience()
myapp.user.product.purchased >>> personalizeUserExperience()
```

You cannot have multiple Subscriptions using the same Event and Function.  The Event Gateway will throw an error if you try to create multiple Subscriptions using the same Event and Function.

```
myapp.user.created >>> sendWelcomeEmail()
myapp.user.created >>> sendWelcomeEmail()
myapp.user.created >>> sendWelcomeEmail()
```

Subscriptions offer some extra features which enable you to use them for API use-cases.  Each Subscription has a `path`, `method` and `cors` setting.

Subscriptions can call Functions in two ways:  ***asynchronously*** or ***synchronously***.  

An ***asynchronous*** Subscription means when you send an Event to the Event Gateway and it routes it to the Function, the Event Gateway will not send the Function's response back to the origin/client that made the request.  You can have infinite asynchronous Subscriptions on a single Event.

Here is an example of multiple async Subscriptions on a single Event:

```
myapp.error.created >>> storeError()
myapp.error.created >>> emailOps()
myapp.error.created >>> postInSlack()
```

A ***synchronous*** Subscription means the Event Gateway will wait for a serverless function to process an event and then return the response to the origin/client that published the Event.  You can use this to create a traditional request/response experience, while still using an event-driven model.

You can create a REST API using a synchronous Subscription on the Event Gateway.  Each Subscription contains

 use a Subscription's `path`,`method` and `cors` settings to create a REST API route:

```
http.request >>> createUser() --- /users/create via the POST method
```



For example, you can put the Event Gateway in your client

```
myapp.user.create.request >>> createUser()
```
