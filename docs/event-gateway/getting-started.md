# Event Gateway - Getting Started

Here's how to deploy a simple application with the hosted version of the Event Gateway.

## Setup

There are a few things you will need to setup before using the Serverless Platform. This guide will walk you through each of these steps.
* Should have node 6.x or later installed
* Should have a new AWS IAM User with full admin privileges
* Should have the Serverless Framework installed
* Should have your AWS credentials configured with the Serverless Framework
* Should have an account setup on https://serverless.com

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

### Login via the cli
In order to allow the Serverless framework to access the platform you will need to provide the framework with platform credentials. To do this simply use the `login` command and the framework will download platform access keys behind the scenes.

```sh
serverless login
```

### Setup a Serverless Platform account
* Signing up for an account on the Serverless Platform is easy. Just click [here](https://dashboard.serverless.com) and follow the instructions.
