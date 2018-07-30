# Dashboard - User Guide

The Dashboard is designed to be the ultimate operations console for serverless application development. Serverless application infrastructures can comprise multiple services across service providers, which is why a simple UI for interfacing with them is so crucial. Our goal with the Dashboard is to make monitoring, collaborating and securing your serverless applications just as easy as using our other products.


We built the Dashboard so that it interfaces seamlessly with the Serverless Framework and Event Gateway, and whatever other providers and resources you include in your application. Deploy once from the CLI and immediately view your application from the Dashboard for easy management. 


## From sign up to first deploy

Signing up for Dashboard is simple: either run the ```sls login``` command from the CLI and follow the prompts, or visit [dashboard.serverless.com](https://dashboard.serverless.com) directly. 

![Landing page](https://s3.amazonaws.com/assets.github.serverless/platform/dashboard-landing-page.png)

Dashboard supports multiple user authentication options including GitHub, Google, and email. If you’re signing up via email we’ll need to verify your credentials with a quick verification email link.

Once you’re in, there’s a simple 2-step onboarding process to follow: 

* **Choose a username**: Depending on your auth method, we will have pre-filled a username for you. However, you’re welcome to choose a new one at this step. Choose carefully, as in the background we also create a default Tenant with the same name that we associate with your user profile. A Tenant is a secure workspace which can contain one or more Applications.

![Create username](https://s3.amazonaws.com/assets.github.serverless/platform/onboarding-username.png)

* **Create a default application**: The Serverless Platform uses the Application concept as a unit of organization for grouping related logic and infrastructure (like any other software application). We’ll have you create one here. Each Application gets its own subdomain on the Event Gateway that is shared across the parent Tenant,  for example ```myapp.slsgateway.com```.

![Create default app](https://s3.amazonaws.com/assets.github.serverless/platform/onboarding-first-app-name.png)

After the onboarding you’ll land on an empty Service page with instructions for how to complete your first deploy. If you’re an existing user of the Framework you’ll need to add both `application` and `tenant` fields to your `serverless.yml` to view your services in the dashboard. Follow the instructions on this page and you’ll be ready in no time!

## Create an app

The Serverless Platform and Dashboard use the Application concept as a unit of organization for grouping related logic and infrastructure (like any other software application). You can easily create new Applications from the UI. 

![Create App button](https://s3.amazonaws.com/assets.github.serverless/platform/new-app-button-big.png)

1. From the Develop --> Applications screen, click on the ```+ App``` button in the top right of the screen.

2. Name your new application and confirm the subdomain URL. 

    ![choose app name](https://s3.amazonaws.com/assets.github.serverless/platform/new-app-choose-name.png)

3. And that’s it - your application is ready to be deployed from the CLI! 

    ![confirm app URL](https://s3.amazonaws.com/assets.github.serverless/platform/new-app-URL.png)


## Explore a deployed service

Once you’ve deployed an Application successfully from the CLI, you’ll be able to explore the services contained within it from the Dashboard. 

### Service Overview

This view showcases the most important information about your deployed service. If you haven’t deployed a service, you’ll see instructions for how to go about doing just that:

![Undeployed service](https://s3.amazonaws.com/assets.github.serverless/platform/service-undeployed.png)


However, once you’ve deployed a Service you’ll see a lot more information: 

![Service overview](https://s3.amazonaws.com/assets.github.serverless/platform/service+overview.png)


* On the left, a list of Functions, Subscriptions and Resources that were last deployed
* On the right, a snapshot of important metadata regarding your service, including:

  * Total number of functions that were deployed
  * Total number of subscriptions that were deployed
  * Who performed the most recent deployment and when
  * The Provider the Service is deployed to
  * Any Readme that’s associated with the Service (i.e. from a Github repo)

Services can contain a lot of information, which we’ve broken out into separate tabbed views on the Overview screen:

![Overview tabs](https://s3.amazonaws.com/assets.github.serverless/platform/service+overview+-+tabs.png)

* Logs: a list of logs for the service. Depending on how you configure your logs pipeline, you might see Event Gateway logs, function logs, or a mix of both. [Click here to learn more about logs](#logs).
* The `serverless.yml` of your deployed service. This is especially useful if you’ve been invited to view a service but don’t have access to the source code repo.
* A list of collaborators within the service. Collaborators are people who have deployed the service (performed a creation, removal or update). [Click here to see how to invite people to collaborate on your tenant](#invite-collaborators).
* A view of the deployment history for the service. [Click here for an in-depth look at the deployments features inside Dashboard](#deployment-history).

### Function Overview

In addition to viewing a list of deployed functions, you can drill in to a specific function for more detail, including: 

* The number of subscriptions it’s associated with
* Who last deployed the function and when
* Details like its runtime language, memory usage and timeout
* Provider information, i.e. for AWS: the ARN, account ID, and region
* Package information including codeSHA, code size, main URL, and the handler name

![function overview](https://s3.amazonaws.com/assets.github.serverless/platform/function+overview.png)

### Subscription Overview

A subscription indicates the relationship between a Function and an Event. As such, the left navigation shows the subscription type (i.e. aws.apigateway.http), metadata such as path and method (or whatever is relevant for the subscription type), and any associated function(s).

![subscription overview page](https://s3.amazonaws.com/assets.github.serverless/platform/event+gateway+-+subscription+main.png)

Drilling in you’ll see a range of information, including but not limited to:

* The number of functions it’s associated with
* Who last deployed the subscription and when
* Details like its source, any custom authorizers and other metadata
* Usage details including its URL and a curl command for HTTP subscriptions
* A list of functions included in the subscription
Any permissions-related metadata

### Deployment history

Serverless is unique in part because it shortens the development cycle by orders of magnitude. However, continuous deployment without a simple record to navigate makes it hard to keep track of things when they’re working well - or dig in when they break. Dashboard solves this by providing a historical view of deployments, including who performed it, when, and its status (successful, failed, or in-progress). Couple this with your own CI/CD pipeline tools, and you get drastically increased visibility into the health of your serverless application.

![deploys](https://s3.amazonaws.com/assets.github.serverless/platform/collaboration+-+deploys+main.png)

To access the deployments view, navigate into a specific Service and select the “Deploys” tab. 

Coming soon: the ability to view the specific infrastructure pieces that have changed, in addition to the code diffs associated with a specific deployment.

### Logs

Serverless is, first and foremost, event-driven. As such, it’s useful to see the lifecycle of a function or event, and to hone in on any errors that might have arisen during a deployment. The Dashboard Logs view is designed to help you understand the flow of events through your system, and to track down any problems. 

Logs are available on the Application overview screen, and are pulled from all the services inside a particular app. Logs are sorted from newest-to-oldest descending, and to see new logs you’ll need to refresh the page. 

### Invite collaborators

Serverless unlocks the potential of developers to work and build more quickly and efficiently than ever before - and now, we’re extending this capability to include teams. Invited team members have access to all the applications inside a Tenant; in the future we will support more fine-grained permissions controls at the service and infrastructure level.

Inviting team members is easy: 

1. Navigate to the “Collaborate” page

2. Enter the email of the person you’d like to invite

3. Choose their role (Admins can invite and revoke users while Collaborators cannot)

4. Hit “Send Invite” and you’re done!

![collaborate page screenshot](https://s3.amazonaws.com/assets.github.serverless/platform/collaboration+-+invite+main.png)

### Provision access keys

Along with Dashboard and the Framework, Serverless now offers the hosted Event Gateway as a fully managed service. To setup the hosted Event Gateway you’ll need to provision Access Keys that you then set as environment variables before deploying an application. 

We provide a default access key when you first sign up, but we recommend creating new ones for additional security.

Provisioning new access keys is straightforward: 

1. Navigate to the “Secure” page within Dashboard.

2. Click on the “+ Access Key” button.

3. Name your access key. We recommend a name that you’ll remember in the future.

    ![name key](https://s3.amazonaws.com/assets.github.serverless/platform/create+key.png)

4. Before closing out, be sure to copy the secret access key somewhere safe, as it’s the only time you’ll be able to view it.

    ![secret key](https://s3.amazonaws.com/assets.github.serverless/platform/secret+key.png)

You can remove an access key at any time by hovering over it and clicking the “X”. Once you do this it can’t be undone, so do keep that in mind.

![remove key](https://s3.amazonaws.com/assets.github.serverless/platform/remove+key.png)
    

