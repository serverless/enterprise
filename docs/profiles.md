# Deployment Profiles

Deployment Profiles is a new feature introduced in Serverless Framework Enterprise to enable each stage of your Serverless application to use a unique set of [Safeguards](./safeguards.md), [Secrets](./secrets.md) and [AWS Access Roles](./aws-access-roles.md). 

## Minimum Version and Enterprise Plugin Requirements

In order to enable Serverless Deployment Profiles for a particular Service you must deploy or redeploy that Service using Serverless Framework open-source CLI with the Enterprise Plugin version 0.6.0 or later.

- If you are an existing Serverless Framework Enterprise user and have a Service that you want to configure to use Serverless Insights, follow these steps to [update an existing Service](./update.md)
- If you are new to the Serverless Framework open source CLI or Serverless Framework Enterprise simply follow the steps in this [new user getting started guide](./getting-started.md#install-the-enterprise-plugin) to get up and running

## Installing

That’s it! Deployment profiles are enabled by default in the Enterprise plugin.

## Use Deployment Profiles

Deployment profiles are managed in the [Serverless Framework Enterprise Dashboard](https://dashboard.serverless.com). When you run `serverless deploy`, the CLI obtains the Safeguard policies, Secrets and the generated AWS Credentials.

### Creating a new Deployment Profile

Create a new deployment profile by navigating to **profiles** in the [Serverless Framework Enterprise Dashboard](https://dashboard.serverless.com) and click **add**.

#### name

This is a user-readable name for the deployment profile. Most often it has a name that maps to a stage (e.g. “dev”, “prod”), or in larger organizations the line of business or environment (e.g. “apac-banking-prod”). This name will uniquely identify the deployment profile when associating it with a stage in an application.

#### description

The description helps provide additional context when listing the deployment profiles.

#### AWS credential access roles, secrets and safeguards

AWS Credential Access Roles, Secrets and Safeguards have individual configuration guides:

- [AWS Access Roles](./aws-access-role.md#set-up-the-service)
- [safeguard policies](./safeguards.md#configuring-policies)
- [secrets](./secrets.md)

### Creating a new Stage

Create a new stage by navigating to **applications** in the [Serverless Framework Enterprise Dashboard](https://dashboard.serverless.com).

1. Expand the application and click into the **stages** tab. 
2. Click **add stage** in the tab
3. Provide the **name** and select the **deployment profile**.

### Using a Deployment Profile to deploy

When you run `serverless deploy` Serverless Framework will obtain the AWS Access Key, Secret and Safeguards associated with the deployment profile configured for that application and stage based on the values for `app` and `stage` in your `serverless.yml` file.

Serverless Framework Enterprise will first try to match the current stage from `serverless.yml` with a stage configured on that application in the dashboard. If they match, it will use the deployment profile associated with that stage. If the stages do not match, then the default deployment profile from that application will be used.
