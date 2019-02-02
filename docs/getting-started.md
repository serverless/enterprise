# Serverless Framework Enterprise - Getting Started

Complete the steps in this guide to install the Serverless Framework open-source CLI and deploy a sample Service on AWS that reports deployment information and operational metrics to your Serverless Framework Enterprise dashboard.

## Initial Setup

To take advantage of Serverless Framework Enterprise features like Serverless Safeguards and Serverless Insights, there are a few prerequisites you need to install and configure. This section will walk you through each of the following:

* [Installing Node.js 6.x or later on your local machine](#install-nodejs-and-npm)
* [Creating an AWS account and IAM User](#setup-an-aws-account)
* [Installing the Serverless Framework open-source CLI version 1.36.3 or later](#install-the-serverless-framework-open-source-cli)
* [Configuring your AWS credentials to work with your Serverless Framework CLI](#configure-aws-access-keys-in-your-serverless-framework-open-source-cli)
* [Creating an account on the Serverless Framework Enterprise dashboard](#create-a-serverless-framework-enterprise-account)

If you already have these prerequisites setup you can skip ahead to deploy an example Service.

### Install Node.js and NPM
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


### Create a Serverless Framework Enterprise account

The Serverless Framework Enterprise packages services together in a higher level application concept. Applications can contain one or more Service, each of which can be independently deployed. This abstraction is perfect for allowing more than one team to work on a single application or simply for structuring your application in such a way where parts of it are independently manageable.

1. Open the Serverless Framework Enterprise in a web browser https://dashboard.serverless.com
2. Click on the `Sign Up` button and follow the prompts to create a User, Tenant and Application

## Deploy an example Service

Now that you’ve completed your setup, let’s deploy a serverless Service.

### Create a new Service from a Template

Use the Serverless Framework open-source CLI to create a new Service using the Enterprise Template we’ve created, specifying a unique name and an optional path for your Service.

```sh
# Create a new Serverless Service/Project
$ serverless create -n my-service -u https://github.com/serverless/enterprise-template

# Change into the newly created directory
$ cd my-service

# Install Serverless Enterprise dependencies
$ npm install
```

### Specify the Tenant and Application

In order to deploy a Service to your App using the Serverless Framework open-source CLI, you need to specify the App and your Tenant inside your `serverless.yml` file:

1. Specify the app and tenant you’d like to deploy a service to:
```yaml
tenant: your-tenant-name
app: your-app-name
```

This is what the new information looks like in context:

```yaml
tenant: your-tenant-name
app: your-app-name
service: your-service-name

frameworkVersion: ">=1.36.2"

provider:
  name: aws
  runtime: nodejs8.10

plugins:
  - '@serverless/enterprise-plugin'

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: post

```

### Login via the CLI
In order to allow the Serverless Framework open-source CLI to access the Serverless Framework Enterprise dashboard you will need to provide the framework with platform credentials. To do this simply use the `login` command and the framework will download platform access keys behind the scenes.

```sh
serverless login
```

### Deploy the Service

Use this when you have made changes to your Functions, Events or Resources in `serverless.yml` or you simply want to deploy all changes within your Service at the same time.

```bash
serverless deploy -v
```

### Test your example Service

Replace the the URL in the following curl command with your returned endpoint URL, which you can find in the `sls deploy` output, to hit your URL endpoint.

```bash
$ curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/hello 
```

### Invoke your example Service's function

Invokes a Function and returns logs.

```bash
serverless invoke -f hello -l
```

### Fetch the Function Logs

Open up a separate tab in your console and stream all logs for a specific Function using this command.

```bash
serverless logs -f hello -t
```

### See how Serverless Insights work

Use either of the two commands below to generate mock errors that you will then be able to visualize in the the Serverless Framework Enterprise dashboard.  If you use the curl command remember to replace the the URL in the command with your returned endpoint URL, which you can find in your `sls deploy` output.

```bash
serverless invoke -f hello -d '{"body": "not a json string"}' # causes a JSON parsing error so error Insights will populate
```

```bash
$ curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/hello --data-binary 'not a json string' # causes a JSON parsing error so error Insights will populate
```

**Note**: It may take up to 5 minutes for the [new error alert](https://github.com/serverless/enterprise/blob/master/docs/insights.md#new-error) to appear in the dashboard.

Check out the [Insights documentation](https://github.com/serverless/enterprise/blob/master/docs/insights.md#alerts) for more on details on the available alerts.

## Cleanup

### Removing your example Service

If at any point, you no longer need your Service, you can run the following command to remove the Functions, Events and Resources that were created.  This will delete the AWS resources you created and ensure that you don't incur any unexpected charges. It will also remove the Service from your Serverless Framework Enterprise dashboard.

```sh
serverless remove
```


## Deploy more Services!

Now you are ready to leverage the hundreds of Service Examples available to you from Serverless, Inc. and our large and growing community to build your own Services.

### Create a new Service from an Example

Clone a Service from the Serverless Inc. repository of [Examples](https://serverless.com/examples/)
```sh
# replace folder-name below with the folder name of the example you want to use
$ serverless install -u https://github.com/serverless/examples/tree/master/folder-name -n my-project
```
Or, clone a Service example from the Serverless open-source community
```sh
$ serverless install -u https://github.com/author/project -n my-project
```
### Remember to configure your new Service to work the Serverless Framework Enterprise

Install the Serverless Framework Enterprise Plugin
```sh
$ sls plugin install -n @serverless/enterprise-plugin
```
Include your Tenant and App name in your sls yaml file
```sh
tenant: your-tenant-name 
app: your-app-name
```
Login to your Serverless Framework Enterprise account from your Framework CLI
```sh
$ sls login
```
Deploy your service
```sh
$ sls deploy
```
## Next steps

Learn more about the features and benefits of [Serverless Framework Enterprise](https://github.com/serverless/enterprise/blob/master/README.md)
