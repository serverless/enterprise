# Serverless Framework Enterprise - Running in CI/CD

For teams that use the Serverless Framework with the Enterprise Plugin to develop services it might be desirable to deploy the services from a CI/CD pipeline instead of the local CLI. Complete the steps in this guide to install the Serverless Framework open-source CLI, configure authentication for the Enterprise plugin, and deploy a service on AWS in your CI/CD service. This guide will walk you through each of the following:

- [Install Node.js and NPM](#install-nodejs-and-npm)
- [Install the Serverless Framework open-source CLI](#install-the-serverless-framework-open-source-cli)
- [Create an Access Key in the Serverless Framework Enterprise dashboard](#create-an-access-key-in-the-serverless-framework-enterprise-dashboard)
- [Configure your Serverless Framework Enterprise access token in CI/CD](#configure-your-serverless-framework-enterprise-access-token-in-cicd)
- [Configure AWS credentials](#configure-your-aws-credentials)
- [Perform the deploy](#perform-the-deploy)

## Install Node.js and NPM

Your CI/CD environment must have Node.js and NPM installed as they are prerequisites for the Serverless Framework CLI. Follow the instructions below to install Node.js and NPM. You must install **version 6.x or later** of Node.js.

[https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)

## Install the Serverless Framework open-source CLI

In your CI/CD environment install Serverless Framework open-source CLI as it is later used to perform the deploy.

```sh
npm install -g serverless
```

## Create an Access Key in the Serverless Framework Enterprise dashboard

When using the the Serverless Framework open-source CLI with the Enterprise plugin locally you must first authenticate with the `serverless login` command as described in the [Getting Started Guide](https://github.com/serverless/enterprise/blob/master/docs/getting-started.md#login-via-the-cli). The `serverless login` command will open up a browser where you are prompted for your Serverless Enterprise username and password. Since your CI/CD environment is non-interactive, you will need to authenticate the CLI using an access token instead.

Follow these steps to create an access token:

1. Login to the dashboard at https://dashboard.serverless.com/
2. Navigate to “Secure”
3. Click “+ access key” button.
4. Provide a name and press “Create”
5. You will be presented with the access key on the new page. 

**Note**: The access token has permission to the tenant; however, it is associated with your account. If your account is deleted, then the access token will be revoked too.

## Configure your Serverless Framework Enterprise access token in CI/CD

In the previous step you obtained an access token from the Serverless Framework Enterprise dashboard which you will now set in your CI/CD environment such that the Serverless Framework open-source CLI can authenticate with the Serverless Framework Enterprise dashboard.

```sh
export SERVERLESS_ACCESS_KEY=<your-serverless-enterprise-access-key>
```

## Configure your AWS Credentials

You should have already completed the [getting started](https://github.com/serverless/enterprise/blob/master/docs/getting-started.md) guide and created an AWS Account. Set the AWS account access key and secret access key in your CI/CD pipeline:

```sh
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
```

## Perform the deploy
Your CI/CD pipeline is now ready to deploy the service. All the previous steps only need to be completed once to support deployments of Serverless Framework services. This step should be configured to run on every deploy.

```sh
npm install # installs all plugins and packages
serverless deploy # deploys your service
```

