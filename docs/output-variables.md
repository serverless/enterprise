# Output Variables

Serverless Framework Enterprise helps you refactor large serverless applications by decoupling the shared services from the dependent services. The new output variables feature allows you to define output variables in a `serverless.yml` and then reference those variables in other `serverless.yml` file. The values are published to Serverless Framework Enterprise when you deploy, and they are loaded in other services when they are deployed.

## Minimum Version Requirements

You must deploy or redeploy that Service using Serverless Framework open-source CLI version 1.44.0 or later.
## Define output variables for shared services
Define new output variables by adding a dictionary (key/value pairs) to the `outputs:` field in the `serverless.yml` file. The values can include any value supported by YAML including strings, integers, lists (arrays), and dictionaries (key/value pairs). The dictionaries can also be nested to any depth.

**serverless.yml**
```yaml
outputs:
  my-key: my-value
  my-availability-zones:
   - us-east-1a
   - us-east-1b
  my-table-name: DynamoDbTable-${self:custom.stage}
```

The values will be interpolated and saved when the service is deployed. The values are saved as a part of the service instance so they are associated with the service, stage and region.

## Use output variables in dependent services

Output variables can be consumed from other services with they `${state()}` variable. The reference must be formatted as `<service-id>.<key>`, where the `<service-id>` references another service in the same application, stage and region and the `<key>` references the dictionary key from the `outputs:`. The `<key>` can also be nested to reference nested values from the dictionary.

**serverless.yml**
```yaml
${state(my-service.var-key)}
```

## View output variables in the dashboard

The output variables for a service are made available on two different pages of the Serverless Framework Enterprise dashboard.

The current output variables for a given service instance are available in the **Variables** > **Output** section of the service instance view. This will show the values which are currently available.

The historic output variables for a given service instance are available as a part of the deployment record which is available in the **activity & insights** section of the service instance view after a deployment. 
