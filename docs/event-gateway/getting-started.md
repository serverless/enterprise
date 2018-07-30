# Event Gateway - Getting Started

Here's how to deploy a simple service with the hosted version of the Event Gateway. You will deploy a function connected to a REST API endpoint that can be accessed with a web browser or an HTTP client in your terminal.

## Setup

There are a few things you will need to setup before using the Serverless Platform. This guide will walk you through each of these steps.

* Should have node 6.x or later installed
* Should have a new AWS IAM User with full admin privileges
* Should have the Serverless Framework v1.29+ installed
* Should have your AWS credentials configured with the Serverless Framework
* Should have an account setup on https://dashboard.serverless.com

If you already have these set up, you can skip to the [Development](#development) section.

### Install node JS and NPM

* Follow instructions here https://nodejs.org/en/download/package-manager/
* At the end, you should be able to run `node -v` from your command line and get a result like this:

	```sh
	$ node -v
	vx.x.x
	```


* You should also be able to run `npm -v` from your command line and should see:

	```sh
	$ npm -v
	x.x.x
	```

### Setup an AWS account

* You will need an access key for an AWS IAM User with full admin privileges
* If you already have an access key, skip to the next task.
* If you don't have an AWS account or access key, you can follow our guide [here to help you get an account setup](./..//setup-aws-account.md).

### Install the Serverless Framework

* Run this command in your terminal:

	```sh
	npm install -g serverless
	```

* After install is complete, you should be able to run `serverless -v` from your command line and get a result like this:

	```sh
	$ serverless -v
	x.x.x
	```

### Configure AWS Access Keys in Serverless Framework
In order for the Serverless Framework to deploy your application to your AWS account, it will need to be configured with your AWS credentials. You can follow our instructions [here for configuring this](./setup-aws-account.md#using-aws-access-keys).

### Login via the cli
In order to allow the Serverless framework to access the platform you will need to provide the framework with platform credentials. To do this simply use the `login` command and the framework will download platform access keys behind the scenes.

```sh
serverless login
```

### Setup a Serverless Platform account

Signing up for an account on the Serverless Platform is easy. Just click [here](https://dashboard.serverless.com) and follow the instructions.

## Development

### Create an application on the platform

The Serverless Platform packages services together in a higher level application concept. Applications can contain one or more Service, each of which can be independently deployed. This abstraction is perfect for allowing more than one team to work on a single app or simply for structuring your application in such a way where parts of it are independently manageable.

To create an application on the Serverless Platform follow these instructions:

1. Open the Serverless Dashboard in a web browser https://dashboard.serverless.com
2. Click on the `+ App` button
3. Enter a name for your Application.
4. Click `SAVE`

### Create your handler function

In a clean directory, create a file named `handler.js` with the following contents:

```javascript
'use strict';

module.exports.main = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'You triggered a function in the Event Gateway!',
      input: event,
    }),
  };

  callback(null, response);
};
```

Your file exports a single function called `main`. This function will be the handler for our REST API endpoint.

### Configure your service

Create a new file named `serverless.yml` with the following contents:

```yml
service: my-service

app: <your-app-name>
tenant: <your-tenant-name>

provider:
  name: aws
  runtime: nodejs8.10

functions:
  main:
    handler: handler.main
    events:
      - eventgateway:
          type: sync
          eventType: http.request
          path: /
          method: GET

custom:
  eventTypes:
    http.request:
          
plugins:
  - "@serverless/serverless-event-gateway-plugin"
```

Be sure to set `app` equal to the name of the Application you created previously, and `tenant` equal to the name of the Tenant you created in the Platform.

Your application has an Event Gateway URL that you can use to interact with your Event Gateway. The format of the Event Gateway URL is:

```
https://<tenant>-<app>.slsgateway.com
```

So if you have a tenant of `acme` and an app name of `mainapp`, your Event Gateway URL would be:

```
https://acme-mainapp.slsgateway.com
```

The `functions` block is the key area to focus on. In it, you are defining a single function called `main`. Its handler is the `main` function in the `handler.js` file you created above.

The function defines an `eventgateway` event that will trigger your function.

Finally, you will use the [Event Gateway plugin](https://github.com/serverless/serverless-event-gateway-plugin) for the Serverless Framework to deploy to the Event Gateway. This plugin is registered in the `plugins` block of your `serverless.yml`. 

### Install the Event Gateway plugin

Since we are using the Event Gateway plugin for the Serverless Framework, we need to install it and save it in our application. To do so, run the following commands:

```bash
npm init -f && npm install --save-dev @serverless/serverless-event-gateway-plugin
```

### Deploy your application

Your application is ready to deploy. Run the following command to deploy:

```bash
serverless deploy
```

### Access your endpoint

You can trigger your deployed function by visiting your URL in a browser or by using `curl` in your terminal.

The URL to access your endpoint will be:

```
https://<tenant>-<app>.slsgateway.com
```

To access it via `curl`, run the following command:

```bash
curl -X GET https://<tenant>-<app>.slsgateway.com
```

## Next steps

You have now deployed your first service to the Event Gateway. Look to the following resources for additional learning:

- [Configuration](./configuration.md) for learning about more advanced configuration in the Event Gateway.
- [Examples](../../examples) for seeing example services to deploy on the Event Gateway.
