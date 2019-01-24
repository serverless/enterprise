# Serverless Framework Enterprise - Getting Started

Here's how to use the Serverless Framework open-source CLI to deploy a simple service to AWS and report deployment information and operational metrics to the Serverless Framework Enterprise.

## Setup

There are a few things you will need to setup before using the Serverless Framework Enterprise. This guide will walk you through each of these steps.
* Should have node 6.x or later installed
* Should have a new AWS IAM User with full admin privileges
* Should have the Serverless Framework open-source CLI installed
* Should have your AWS credentials configured with the Serverless Framework open-source CLI
* Should have an account setup on the [Serverless Framework Enterprise dashboard](https://dashboard.serverless.com/)

### Install node JS and NPM
* Follow instructions here https://nodejs.org/en/download/package-manager/
* At the end, you should be able to run `node -v` from your command line and get a result like this...
```sh
$ node -v
vx.x.x
```
* You should also be able to run `npm -v` from your command line and should see...
```sh
$ npm -v
x.x.x
```

### Setup an AWS account
* You will need an access key for an AWS IAM User with full admin privileges
* If you already have an access key, skip to the next task.
* If you don't have an AWS account or access key, you can follow our guide [here to help you get an account setup](./setup-aws-account.md).


### Install the Serverless Framework open-source CLI
* Run this command in your terminal
```sh
npm install -g serverless
```
* After install is complete, you should be able to run `serverless -v` from your command line and get a result like this...
```sh
$ serverless -v
x.x.x
```

### Configure AWS Access Keys in your Serverless Framework open-source CLI
In order for the Serverless Framework open-source CLI to deploy your application to your AWS account, it will need to be configured with your AWS credentials. You can follow our instructions [here for configuring this](./setup-aws-account.md#using-aws-access-keys).

## Development

### Create an application on the Serverless Framework Enterprise

The Serverless Framework Enterprise packages services together in a higher level application concept. Applications can contain one or more Service, each of which can be independently deployed. This abstraction is perfect for allowing more than one team to work on a single application or simply for structuring your application in such a way where parts of it are independently manageable.

To create an application on the Serverless Framework Enterprise follow these instructions
1. Open the Serverless Framework Enterprise in a web browser https://dashboard.serverless.com
2. Click on the `Sign Up` button and follow the prompts to create a User, Tenant and Application


### Create a new Service

Use the Serverless Framework open-source CLI to create a new Service using the sample Enterprise template, specifying a unique name and an optional path for your Service.

```sh
# Create a new Serverless Service/Project
$ serverless create -n my-service -u https://github.com/serverless/enterprise-template

# Change into the newly created directory
$ cd my-service

# Install Serverless Enterprise dependencies
$ npm install
```
### Login via the cli
In order to allow the Serverless Framework open-source CLI to access the Serverless Framework Enterprise dashboard you will need to provide the framework with platform credentials. To do this simply use the `login` command and the framework will download platform access keys behind the scenes.

```sh
serverless login
```

### Specify the Tenant and Application

In order to deploy a Service to your App using the Serverless Framework open-source CLI, you need to specify the App and your tenant inside your `serverless.yml` file:

1. Specify the app and tenant you’d like to deploy a service to:
```yaml
app: your-app-name
tenant: your-tenant-name
```

This is what the new information looks like in context:

```yaml
service: my-service
frameworkVersion: ">=1.36.2"

provider:
  name: aws
  runtime: nodejs8.10

app: your-app-name
tenant: your-tenant-name

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: get

plugins:
  - '@serverless/enterprise-plugin'

```

### Deploy the Service

Use this when you have made changes to your Functions, Events or Resources in `serverless.yml` or you simply want to deploy all changes within your Service at the same time.

```bash
serverless deploy -v
```

### Invoke your Service's function

Invokes a Function and returns logs.

```bash
serverless invoke -f hello -l
```

### Fetch the Function Logs

Open up a separate tab in your console and stream all logs for a specific Function using this command.

```bash
serverless logs -f hello -t
```


## Cleanup

### Removing a service

If at any point, you no longer need your Service, you can run the following command to remove the Functions, Events and Resources that were created.  This will delete the AWS resources you created and ensure that you don't incur any unexpected charges. It will also remove the Service from your Serverless Framework Enterprise dashboard.

```sh
serverless remove
```
