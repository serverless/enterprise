## Getting Started with the Event Gateway

This example shows a simple way to deploy a service to the Event Gateway. It uses the hosted version provided by Serverless, Inc. -- [sign up here](https://dashboard.serverless.com)!

This service will deploy three functions:

- `createUser`: an HTTP endpoint for creating and storing a User in a DynamoDB table;
- `getUser`: an HTTP endpoint for retrieving a User from DynamoDB; and
- `addUserToCRM`: a function that is triggered by a `user.created` event and stores new users in a CRM system.

The `createUser` function allows you to create a new User by sending a JSON payload to `/users`, and the `getUser` function lets you retrieve that User by making a GET request to `/users/{id}`.

In the `createUser` function, we're using the [Event Gateway SDK](https://github.com/serverless/event-gateway-sdk) to emit a custom event of `user.created` into the Event Gateway. You can then subscribe functions to react to this custom event. The `addUserToCRM` function is subscribed to this event as an example -- imagine a Marketing department that wants to store newly-created Users in a CRM.

Let's get started!

## Setup

This is best used with the [hosted version of the Event Gateway](https://dashboard.serverless.com/) provided by Serverless, Inc. as a fully-managed service.

After you create an account, you'll need two things: an **Access Key** and an **Application URL**.

Get an Access Key in the `secure > access keys` section, and set it as an environment variable:

<img src="https://user-images.githubusercontent.com/6509926/39500460-31212824-4d7a-11e8-8333-832fe2ee8cfd.png" width=500 />

```bash
$ export EVENT_GATEWAY_ACCESS_KEY=<paste your key here>
```


Then, grab the URL for one of your applications (`develop > applications` section) and save it as an environment variable:

<img src="https://user-images.githubusercontent.com/6509926/39500504-a029a1f6-4d7a-11e8-806f-0f158574f9c4.png" width=500 />

```bash
$ export EVENT_GATEWAY_APPLICATION=<paste your application here>
```

You're all set!

## Usage

1. Clone this repository and install the packages:

    ```bash
    $ git clone https://github.com/serverless/event-gateway-getting-started.git
    $ cd event-gateway-getting-started
    $ npm install
    $ npm install -g serverless
    ```

2. Set the environment variables as described in the [Setup](#setup) section above.

3. Deploy your service

    ```bash
    $ serverless deploy
    ...
    Service Information
    service: eg-quickstart
    stage: dev
    region: us-east-1
    stack: eg-quickstart-dev
    api keys:
      None
    endpoints:
      None
    functions:
      getUser: eg-quickstart-dev-getUser
      createUser: eg-quickstart-dev-createUser
      addUserToCRM: eg-quickstart-dev-addUserToCRM

    Event Gateway Plugin
    EventGateway: Event type "http.request" created.
    EventGateway: Event type "user.created" created.
    EventGateway: Function "createUser" registered. (ID: eg-quickstart-dev-createUser)
    EventGateway: Function "getUser" registered. (ID: eg-quickstart-dev-getUser)
    EventGateway: Function "addUserToCRM" registered. (ID: eg-quickstart-dev-addUserToCRM)
    EventGateway: Function "createUser" subscribed to "http.request" event.
    EventGateway: Function "addUserToCRM" subscribed to "user.created" event.
    EventGateway: Function "getUser" subscribed to "http.request" event.
    ```

4. Create a new user by hitting the createUser endpoint:

    ```bash
    $ APP="<appURL>"
    $ curl -X POST -H "Content-Type: application/json" https://${APP}/users \
        --data '{
        	"id": "10",
        	"firstName": "Donald",
        	"lastName": "Duck",
        	"email": "donald.duck@disney.com"
        }'
    {"id":10,"firstName":"Donald","lastName":"Duck","email":"donald.duck@disney.com"}
    ```

5. You can now retrieve your user by using the getUser endpoint:

    ```bash
    $ APP="<appURL>"
    $ curl -X GET https://${APP}/users/10
    {"id":"10","email":"donald.duck@disney.com","firstName":"Donald","lastName":"Duck"}
    ```

6. In your createUser code, it emits a `user.created` event to the Event Gateway, which triggers the `addUserToCRM` function. You can check the logs for that function to see that it ran:

    ```bash
    $ sls logs -f addUserToCRM
    START RequestId: 0ccf992b-39dc-11e8-b35d-735763392802 Version: $LATEST
    2018-04-06 20:49:50.917 (+00:00)	0ccf992b-39dc-11e8-b35d-735763392802
    Received user.created event with user:
    { email: 'donald.duck@disney.com',
      firstName: 'Donald',
      id: '10',
      lastName: 'Duck' }
    END RequestId: 0ccf992b-39dc-11e8-b35d-735763392802
    REPORT RequestId: 0ccf992b-39dc-11e8-b35d-735763392802 Duration: 5.15 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 32 MB
    ```

    Nice! We can see our logs from the triggered function.

7. If you'd like to test emitting events into the Gateway, you can use the `sls gateway emit` command:

    ```bash
    $ sls gateway emit --event "user.created" --data "$(cat event.json)"
    Event emitted: user.created
    Run `serverless logs -f <functionName>` to verify your subscribed function was triggered.
    ```

    Again, you can check your logs with `sls logs -f addUserToCRM` to check the behavior of your function.

## Event Gateway Concepts

Now that you know the basics of using the Event Gateway, let's cover some concepts:

- **Events:** Events are bits of data that indicate something happened. This could be an HTTP request ("_a client requested the resource at path `/users/15`_") or it could be a custom event emitted from your application ("_a user was created with the following details..._").

- **Functions:** Functions are bits of logic that operate on individual events. A function may be a Lambda function that reads the event and posts a message in Slack. It could also be a "connector" function that sends your event directly to another system, such as into Firehose for analytics or into SQS for transactional message processing.

- **Subscriptions:** Subscriptions tie functions and events together. Think "If this, then that" for data and compute. "_If I get a `user.created` event, then execute my function to save a new user to our CRM._"

- **Space:** Spaces are a logical unit of isolation within the Event Gateway. Your functions and subscriptions are registered within a particular space and may only interact with other elements in their space.

   With the hosted Event Gateway, you will create **Apps**. Each App receives a fully-qualified domain name to be used with the Event Gateway, such as `https://myorg-dev.slsgateway.com`. Each App maps to a Space within the Event Gateway and will be fully isolated from all other Apps.

## Additional Resources:

- [Event Gateway](https://github.com/serverless/event-gateway) Repository
- [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin) for the Serverless Framework
- [Event Gateway SDK](https://github.com/serverless/event-gateway-sdk) for interacting with the Event Gateway in your application code
