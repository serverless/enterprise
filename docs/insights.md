# Serverless Insights

Serverless Insights help you monitor and optimize your serverless application by providing key metrics and alerts.

## Minimum Version and Enterprise Plugin Requirements

In order to enable Serverless Insights for a particular Service you must deploy or redeploy that Service, using Serverless Framework open-source CLI version 1.36.3 or later, with the Enterprise Plugin installed.

- If you are an existing Serverless Framework Enterprise dahboard user and have a previously deployed Service that you now want to configure to use Serverless Insights, follow these steps to [update an existing Service](./update.md)
- If you are new to the Serverless Framework open source CLI or Serverless Framework Enterprise simply follow the steps in this [new user getting started guide](./getting-started.md#install-the-enterprise-plugin) to get up and running

## Supported Runtimes and Regions

Currently, Serverless Insights support is limited to the following runtimes and regions.  

- Runtimes: Node.js
- Regions:  AWS us-east-1

Only services that are deployed to a supported region, and include one or more functions using a supported runtime, will generate metric and alert data.  If these conditions are not met Servereless Insights metrics will not populate with data and Servless Insights alerts will not fire. 

Need unsupported runtimes and regions?  Let us know what you need.  We are working hard to quickly expand our supported runtimes and regions. 

## Installing

That's it!  Insights are enabled by default by including the Enterprise plugin.

### Configuration

Serverless Framework Enterprise will automatically enable log collection. If you wish to disable log collection, set the following options:

**serverless.yml**
```yaml
custom:
  enterprise:
    collectLambdaLogs: false
```

## Alerts

As part of the Serverless Insgights feature we include a set of pre-configured alerts designed to help you optimize the performance and security of your serverless applications, while simultaneously lowering your costs. These events are presented in the "activity and insights" feed within the Serverless Enterprise Framework [dashboard](https://dashboard.serverless.com/).  Preconfigured alerts include the following:

### New Error

Errors happen, and the sooner you know about them after they are introduced the better equiped you are to proactively mitigate their impact.  

On a per function basis, the new error insight runs every five minutes, tracks error types reported during the past five minutes, and compares them with all error types reported over the prior 48 hours.  An alert is generated when an error type is found that was not present during the prior 48 hours.  From the activity and insights feed you are able to drill into the details of a specific occurrence of the new error type.

### Escalated Invocation Count

An escalated invocation count can mean good things (e.g. more traffic) or bad things (e.g. higher costs or a runaway function).  This alert helps you get out in front of both the good and the bad scenarios.

The escalated invocation count insight runs every five minutes and calculates the sum of invocations for a function over the prior five minutes. It then compares this most recent five minute invocaton count against the highest five minute invocation count recorded during the prior 48 hours. If the most recent five minute invocation count is 25% greater than the highest five minute invocation count over the previous 48 hours an alert will be generated.


### Unused memory

Configured memory for a function defines memory, cpu, and I/O capacity. It is also what defines a function's price.  While there are sometimes good reasons to overprovision memory (e.g. because your workload is cpu bound), unused memomory can often represent an opportunity to save money by better optimizing your function's configured memory.

The unused memory insight runs once per week at midnight UTC on Sunday.  It looks at all invocations of a function over the prior seven days and identifies the funcition invocation during that period that used the most amount of its configured memory.  If that amount is less than 80% of the function's configured memory it will generate an alert.

## Metrics

As part of the Serverless Insgights feature we also include a set of pre-configured charts, including the following:


### Invocations

The invociations chart shows the aggregate number of invocations for a particular service for a selected time period.  Click into any bar on the chart to see function specific metrics.  

### Errors

The errors chart shows error count trends for a service.  Click into a point on the chart to see error counts and error types by function.  Click on an error type to see an occurrence of an error.

### Durations

The durations chart shows the aggregate duration times for all functions in a particular Service for a selected time period.  Click into any point on the chart to see function specific metrics, including maximum, average, and minimum durations.


