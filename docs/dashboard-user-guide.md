# Serverless Framework Enterprise - User Guide

The Serverless Framework Enterprise is designed to be the ultimate operations console for serverless application development. Serverless application infrastructures can comprise multiple services across service providers, which is why a simple UI for interfacing with them is so crucial. Our goal with the Serverless Framework Enterprise is to make monitoring, collaborating and securing your serverless applications just as easy as using our other products.


We built the Serverless Framework Enterprise so that it interfaces seamlessly with the Serverless Framework open-source CLI. Deploy once from the CLI and immediately view your application from the Serverless Framework Enterprise dashboard for easy management. 


## From sign up to first deploy

Signing up for the Serverless Framework Enterprise is simple: either run the ```sls login``` command from the CLI and follow the prompts, or visit [dashboard.serverless.com](https://dashboard.serverless.com) directly. 

Serverless Framework Enterprise supports multiple user authentication options including GitHub, Google, and email. If you’re signing up via email we’ll need to verify your credentials with a quick verification email link.

Once you’re in, there’s a simple 2-step onboarding process to follow: 

* **Choose a username**: Depending on your auth method, we will have pre-filled a username for you. However, you’re welcome to choose a new one at this step. Choose carefully, as in the background we also create a default Tenant with the same name that we associate with your user profile. A Tenant is a secure workspace which can contain one or more Applications.

* **Create a default application**: The Serverless Framework Enterprise uses the Application concept as a unit of organization for grouping related logic and infrastructure (like any other software application). We’ll have you create one here. 

After the onboarding you’ll land on an empty Service page with instructions for how to complete your first deploy. If you’re an existing user of the Serverless Framework open-source CLI you’ll need to add both `application` and `tenant` fields to your `serverless.yml` to view your services in the dashboard. Follow the instructions on this page and you’ll be ready in no time!

## Create an app

The Serverless Framework Enterprise uses the Application concept as a unit of organization for grouping related logic and infrastructure (like any other software application). You can easily create new Applications from the UI. 

1. From the View --> Applications screen, click on the ```+ App``` button in the top right of the screen.

2. Name your new application. 

3. And that’s it - your application is ready to be deployed from the CLI! 

## Explore a deployed service

Once you’ve deployed an Application successfully from the CLI, you’ll be able to explore the services contained within it from the Serverless Framework Enterprise dashboard. 

### Service Overview

This view showcases the most important information about your deployed service. If you haven’t deployed a service, you’ll see instructions for how to go about doing just that:

However, once you’ve deployed a Service you’ll see a lot more information: 

* On the left, a list of Functions, Subscriptions and Resources that were last deployed
* On the right, a snapshot of important data regarding your service, including:

  * A summary of your Service
  * An activity and insights feed that will show you deployments, failed deployments and alerts.
  * Key metrics for your Service, like number of invocations and errors, and durations

### Function Overview

In addition to viewing a list of deployed functions, you can drill in to a specific function for more detail, including: 

* The number of subscriptions it’s associated with
* Who last deployed the function and when
* Details like its runtime language, memory usage and timeout
* Provider information, i.e. for AWS: the ARN, account ID, and region
* Package information including codeSHA, code size, main URL, and the handler name

### Subscription Overview

A subscription indicates the relationship between a Function and an Event. As such, the left navigation shows the subscription type (i.e. aws.apigateway.http), metadata such as path and method (or whatever is relevant for the subscription type), and any associated function(s).

Drilling in you’ll see a range of information, including but not limited to:

* The number of functions it’s associated with
* Who last deployed the subscription and when
* Details like its source, any custom authorizers and other metadata
* Usage details including its URL and a curl command for HTTP subscriptions
* A list of functions included in the subscription
Any permissions-related metadata


### Invite collaborators

Serverless unlocks the potential of developers to work and build more quickly and efficiently than ever before - and now, we’re extending this capability to include teams. Invited team members have access to all the applications inside a Tenant.

Inviting team members is easy: 

1. Navigate to the “Collaborate” page

2. Enter the email of the person you’d like to invite

3. Choose their role (Admins can invite and revoke users while Collaborators cannot)

4. Hit “Send Invite” and you’re done!

### Provision access keys


We provide a default access key when you first sign up, but we recommend creating new ones for additional security.

Provisioning new access keys is straightforward: 

1. Navigate to the “Secure” page within Dashboard.

2. Click on the “+ Access Key” button.

3. Name your access key. We recommend a name that you’ll remember in the future.

4. Before closing out, be sure to copy the secret access key somewhere safe, as it’s the only time you’ll be able to view it.

You can remove an access key at any time by hovering over it and clicking the “X”. Once you do this it can’t be undone, so do keep that in mind.
    
