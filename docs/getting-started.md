# Getting Started with the Serverless Platform

This guide walks you through deploying a simple service to the Serverless Platform. It uses your own AWS credentials and reports the information to the platform after deployment, providing a visual interface for viewing the current state of your serverless application.


## Setup

A few things you will need to setup before using the Serverless Platform.
* Should have node 6.x or later installed
* Should have a new AWS IAM User with full admin privileges
* Should have an account setup on https://serverless.com
* Should have the Serverless Framework installed
* Should have your AWS credentials configured with the Serverless Framework

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

### Setup a Serverless Platform account
* Signing up for an account on the Serverless Platform is easy. Just click [here](https://dashboard.serverless.com) and follow the instructions.

### Install the Serverless Framework
* Run this command in your terminal
```sh
npm install -g serverless
```
* After install is complete, you should be able to run `serverless -v` from your command line and get a result like this...
```sh
$ serverless -v
x.x.x
```

### Login via the cli

In order to allow the Serverless framework to access the platform you will need to provide the framework with platform credentials. To do this simply use the `login` command and the framework will download platform access keys behind the scenes.

```sh
serverless login
```


## Development

### Create an application on the platform

The Serverless Platform packages services together in a higher level application concept. Applications can contain one or more service, each of which can be independently deployed. This abstraction is perfect for allowing more than one team to work on a single app or simply for structuring your application in such a way where parts of it are independently manageable.

To create an application on the Serverless Platform

### Create a new service

Create a new service using the Node.js template, specifying a unique name and an optional path for your service.

```sh
# Create a new Serverless Service/Project
$ serverless create --template aws-nodejs --path my-service
# Change into the newly created directory
$ cd my-service
```


### Deploy the service

### Invoke your service's function

### View the logs on the platform


## Cleanup

### Removing a service

If at any point, you no longer need your service, you can run the following command to remove the Functions, Events and Resources that were created, and ensure that you don't incur any unexpected charges.

```sh
serverless remove
```
