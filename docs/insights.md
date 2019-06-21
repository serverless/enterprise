# Serverless Insights

Serverless Insights help you monitor and optimize your serverless application by providing key metrics and alerts.

## Minimum Version Requirements

You must deploy or redeploy that Service using Serverless Framework open-source CLI version 1.44.0 or later.

- If you are an existing Serverless Framework Enterprise dashboard user and have a previously deployed a Service that you now want to configure to use Serverless Insights, follow these steps to [update an existing Service](./update.md)
- If you are new to the Serverless Framework open source CLI or Serverless Framework Enterprise simply follow the steps in this [new user getting started guide](./getting-started.md) to get up and running

## Supported Runtimes and Regions

Currently, Serverless Insights support is limited to the following providers, runtimes and regions.  

- Provider: AWS
- Runtimes: Node.js
- Regions: us-east-1, us-east-2, us-west-2, eu-central-1, eu-west-1, eu-west-2, ap-northeast-1, ap-southeast-1, ap-southeast-2

Only services that are deployed to a supported region, and include one or more functions using a supported runtime, will generate metric and alert data.  If these conditions are not met Servereless Insights metrics will not populate with data and Serverless Insights alerts will not fire. 

Need unsupported runtimes and regions?  Let us know what you need.  We are working hard to quickly expand our supported runtimes and regions. 

## Installing

That's it!  Insights are enabled by default by deploying with Serverless Framework Enterprise.

### Configuration

Serverless Framework Enterprise will automatically enable log collection.

Serverless Framework will add a CloudWatch Logs Subscription to send logs that match a particular pattern to our infrastructure for processing. This is used for generating the alerts and metrics.

When deploying, Serverless Framework will also create an IAM role in your account that allows the Serverless Framework Enterprise backend to call FilterLogEvents on the CloudWatch Log Groups that are created in that service being deployed. This is used to display the CloudWatch logs in the error details views alongside the stack trace.

If you wish to disable log collection, set the following options:

**serverless.yml**
```yaml
custom:
  enterprise:
    collectLambdaLogs: false
```

### Add notifications

The [notifications](./notifications.md) page provides instructions for adding a notification for Slack or email.


## Alerts

As part of the Serverless Insights feature we include a set of pre-configured alerts designed to help you optimize the performance and security of your serverless applications, while simultaneously lowering your costs. These events are presented in the "activity and insights" feed within the Serverless Enterprise Framework [dashboard](https://dashboard.serverless.com/).  Preconfigured alerts include the following:

### New Error

Errors happen, and the sooner you know about them after they are introduced the better equipped you are to proactively mitigate their impact.  

On a per function basis, the new error insight runs every five minutes, tracks error types reported during the past five minutes, and compares them with all error types reported over the prior 48 hours.  An alert is generated when an error type is found that was not present during the prior 48 hours.  From the activity and insights feed you are able to drill into the details of a specific occurrence of the new error type.

### Escalated Invocation Count

An escalated invocation count can mean good things (e.g. more traffic) or bad things (e.g. higher costs or a runaway function).  This alert helps you get out in front of both the good and the bad scenarios.

The escalated invocation count insight runs every five minutes and calculates the sum of invocations for a function over the prior five minutes. It then compares this most recent five minute invocation count against the highest five minute invocation count recorded during the prior 48 hours. If the most recent five minute invocation count is 25% greater than the highest five minute invocation count over the previous 48 hours an alert will be generated.


### Unused memory

Configured memory for a function defines memory, cpu, and I/O capacity. It is also what defines a function's price.  While there are sometimes good reasons to overprovision memory (e.g. because your workload is cpu bound), unused memory can often represent an opportunity to save money by better optimizing your function's configured memory.

The unused memory insight runs once per week at midnight UTC on Sunday.  It looks at all invocations of a function over the prior seven days and identifies the function invocation during that period that used the most amount of its configured memory.  If that amount is less than 80% of the function's configured memory it will generate an alert.

## Metrics

As part of the Serverless Insights feature we also include a set of pre-configured charts, including the following:


### Invocations

The invociations chart shows the aggregate number of invocations for a particular service for a selected time period.  Click into any bar on the chart to see function specific metrics.  

### Errors

The errors chart shows error count trends for a service.  Click into a point on the chart to see error counts and error types by function.  Click on an error type to see an occurrence of an error.

### Durations

The durations chart shows the aggregate duration times for all functions in a particular Service for a selected time period.  Click into any point on the chart to see function specific metrics, including maximum, average, and minimum durations.

## Advanced Configuration Options

### Uploading Source Map
The [New Error Alert](#new-error) and the [Error Metrics](#errors) can be used to view the stack trace for the occurance of an error. Tools like Webpack and Typescript generate the packaged code and therefore may obfuscate the stack trace. The Serverless Framework Enterprise Plugin and SDK support sourcemaps to properly generate the stack trace.

To use a sourcemap, ensure that your packaging directory includes the compiled source, original source, and the source maps.

For example, if your directory structure is:

```
$ ls -l dist/* src/*
-rw-r--r--  1 dschep  staff   576B Mar 21 17:21 dist/handler.js
-rw-r--r--  1 dschep  staff   911B Mar 21 17:21 dist/handler.js.map
-rw-r--r--  1 dschep  staff   451B Mar 22 12:13 src/handler.js
```

Then you should have a packaging directory that includes all the files above:

```yaml
package:
  include:
    - src/*.js
    - dist/*.js
    - dist/*.js.map
```
