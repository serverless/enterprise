# Insights

Insights is a new feature introduced in Serverless Framework Enterprise to provide metrics and alerts for your serverless application. Serverless Insights help you monitor and optimize your serverless application

## Prerequisites

- Enterprise Plugin must be installed ([new app](./getting-started.md#install-the-enterprise-plugin), [updating](./update.md))
- Serverless Framework version 1.36.2 or greater
- Services must run in AWS US East
- Functions must be using the nodejs runtime

## Installing

Insights are enabled by default in the Enterprise plugin.

### Configuration

Serverless Framework Enterprise will automatically enable log collection. To disable them, set the following options:

**serverless.yml**
```yaml
custom:
  enterprise:
    collectLambdaLogs: false
```

## Alerts

There are three different alerts provided with Insights. These events are made available in the [Dashboard](https://dashboard.serverless.com/) for your service.

### New errors

This insight will trigger when an error is identified which has not been logged in the last 14 days.

### Escalated Invocation Count Insight

This insight will run each minute and compare all functions and their invocations within a service over the last five minutes against the previous 48 hours at five minute intervals. If the function invocation over the last five minutes is > 25% of the highest invocation mark over the previous 48 hours an alert will be generated.

The alert will continue to generate until the threshold has normalized or has dipped back below the 25% threshold.

### Unused memory

This alert will notify when the averge memory usage is below 50% allocated memory.
