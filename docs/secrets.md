# Secrets

Serverless Framework Enterprise Secrets is a new feature which helps you secure your services by securely storing secrets used by your Serverless Framework services. The [Serverless Framework Enterprise Dashboard](https://dashboard.serverless.com/) provides an interface to store and encrypt secrets and manage access to those secrets from your services. The Serverless Framework Enterprise loads the secrets when the service is deployed.

## Minimum Version Requirements

You must deploy or redeploy that Service using Serverless Framework open-source CLI version 1.44.0 or later.

## Creating a new Secret

Create a new secret by navigating to **profiles** in the [Serverless Framework Enterprise Dashboard](https://dashboard.serverless.com).

1. Navigate into the profile you would like to use for the Secret.
2. Navigate into the **secrets** tab.
3. Set a **key** and **value** and click **add**.
4. Repeat Step 3 for each secret you would like to add.
5. When done, click **save changes**.

## Using a Secret to deploy

To use a secret, first make sure that the profile containing that secret is configured as the **default deployment profile** for your application, or it is configured as the **profile** on the stage and application you are using. 

In your `serverless.yml` file add the variable `${secrets:<key>}` anywhere you would like to use the secret. The `<key>` references the Secret Key configured in the Profile. 

When you run `serverless deploy` the Secret values will be obtained, decrypted and used to replace the variables in the `serverless.yml` for the deployment. 
