# Safeguards

Safeguards is a new feature introduced in Serverless Framework Enterprise to
validate the Serverless configuration for operational safety and security.
Safeguards performs a series of policy checks when running the `serverless
deploy` command. There are [three policies](#default-policies) included and
enabled by default. Additionally [custom policies](#custom-policies) can be
added as well.

## Installing

Safeguards are enabled by default in the Enterprise plugin.

## Default Policies

The following policies are included in the Enterprise plugin and enabled by
default. These plugins do not require any additional configuration. They are all
set to be warnings, not failures, so if the policy check fails, the `deploy`
command will not be blocked.

### No "\*" in IAM Role statements

**ID: no-wild-iam-role-statements**

This policy performs a simple check to prevent "\*" permissions being used in
AWS IAM Roles by checking for wildcards on Actions and Resources in grant
statements.

#### Resolution

Update the [custom IAM Roles](https://serverless.com/framework/docs/providers/aws/guide/iam#custom-iam-roles)
in the `serverless.yml` to remove IAM Role Statements which grant access to "\*"
on Actions and Resources. If a plugin generates IAM Role Statements, follow the
instructions provided by the plugin developer to mitigate the issue.

### No clear-text credentials in environment variables

**ID: no-secret-env-vars**

Ensures that the [environment variables configured on the AWS Lambda functions](https://serverless.com/framework/docs/providers/aws/guide/functions#environment-variables)
do not contain environment variables values which follow patterns of common
credential formats.

#### Resolution

Resovling this issue requires that the AWS Lambda function environment variables
do not contain any plain-text credentials; however, your functions may still
require those credentials to be passed in by other means.

There are two recommended alternativves of passing in credentials to your AWS
Lambda functions:

- **SSM Parameter Store**: The article "[You should use SSM Parameter Store over Lambda env variables](https://hackernoon.com/you-should-use-ssm-parameter-store-over-lambda-env-variables-5197fc6ea45b)"
by Yan Cui provides a detailed explanation for using the SSM Parameters in your
Serverless Framework service to save and retrieve credentials.
- **KMS Encryption**: Encrypt the environment variables using [KMS Keys](https://serverless.com/framework/docs/providers/aws/guide/functions#kms-keys).

### Ensure Dead Letter Queues are attached to functions

**ID: require-dlq** 

Ensures all functions with any of the events listed below, or functions with
zero events, have an attached [Dead Letter Queue](https://docs.aws.amazon.com/lambda/latest/dg/dlq.html).

**Events:**

- s3
- sns
- alexaSkill
- iot
- cloudwachEvent
- coudwatchLog
- cognitoUserPool
- alexaHomeSkill

#### Resolution

Configure the [Dead Letter Queue with SNS or SQS](https://serverless.com/framework/docs/providers/aws/guide/functions#dead-letter-queue-dlq)
for all the functions which require the DLQ to be configured.

## Running Policy Checks

The policy checks are performed as a part of the `serverless deploy` command.
This will load the safeguard settings from the `serverless.yml` file to
determine which policies to evaluate.

**Example deploy**
```sh
$ sls deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless Enterprise: (🛡️ Safeguards) Loading 3 policies.
Serverless Enterprise: (🛡️ Safeguards) Running policy "require-dlq"...
Serverless Enterprise: (🛡️ Safeguards) ❌ Policy "require-dlq" prevented the deployment — Function "hello" doesn't have a Dead Letter Queue configured.
Serverless Enterprise: (🛡️ Safeguards) Running policy "no-secret-env-vars"...
Serverless Enterprise: (🛡️ Safeguards) Running policy "no-wild-iam-role-statements"...

  Error --------------------------------------------------

  (🛡️ Safeguards) 1 policies reported irregular conditions. For details, see the logs above.
      ❌ require-dlq: Requirements not satisfied. Deployment halted.

     For debugging logs, run again after setting the "SLS_DEBUG=*" environment variable.

  Get Support --------------------------------------------
     Docs:          docs.serverless.com
     Bugs:          github.com/serverless/serverless/issues
     Issues:        forum.serverless.com

  Your Environment Information -----------------------------
     OS:                     darwin
     Node Version:           8.15.0
     Serverless Version:     1.36.1
```

### Policy check results

When a policy check is performed, the policy can respond with a **pass**,
**fail** or **warning**. A fail will block and prevent the deploy from
occurring. A warning will display a message but the deploy will continue. 

If one or more of the policy checks fail the command will return a 1 exit code so
it can be detected from a script or CI/CD service.

## Configuring Policies

The default policies are enabled by default and do not require additional
configuration. However, you can disable safeguards completely, disable
individual policies and also configure individual policies. 

### Disabling Safeguards

It can be disabled by adding the `safeguard: false` setting to the `custom`
block in your `serverless.yml`.

**serverless.yml**
```yaml
custom:
  safeguards:  false
```

### Disabling Policies

While all the default policies are enabled by default, you can disable
individual policies by selecting only a subset of policies to be enforced. To
select the set of policies to enable, list the individual policy IDs in the
`serverless.yml` file.

**serverless.yml**
```yaml
custom:
  safeguards:
    policies:
      - require-dlq
```

### Configuring Policies

Policies also may accept parameters. The parameters are set in the
`serverless.yml` file by adding the parameters as an object on the policy ID.

```yaml
custom:
  safeguards:
    policies:
      - limit-ddb-capacity:
          readCapacityMax: 2
          writeCapacityMax: 1
```

## Custom Policies

In addition to the default policies you can add custom policies to your
application.

### Creating a custom policy

A policy is simple a Javascript packaged in a module export. To start with a
custom policy first create a directory in your working directory
(e.g. `./policies`) to store the policy files.

Create a single JS file to define your policy (e.g. `my-custom-policy.js`) in the
policies directory.

**./policies/my-custom-policy.js**
```javascript
module.exports = function myCustomPolicy(policy, service) {
  // throw new policy.Failure(“Configuration is not compliant with policy”)
  // policy.warn(“Configuration has a warning”)
  policy.approve()
}
```

The policy object includes two methods, `warn()`, and `approve()` which can be
called with a string to return the policy test results. The `Failure()` method
can be called to create an error response which can be thrown.

To define the policy method you’ll need to inspect the configuration. The entire
configuration is made available in the service object. Use the [default policies](https://github.com/serverless/enterprise-plugin/tree/master/src/lib/safeguards/policies)
and [example policies](https://github.com/serverless/enterprise-plugin/tree/master/examples/safeguards-example-service/policies)
as reference to the content of the service object.

### Enabling a custom policy

Once the policy is implemented and saved in the directory, add the `safeguards`
block to the `serverless.yml` file and set the `location` property to reference
the relative path of the policies directory. To enable the policy you must also
add it to the list of policies.

**serverless.yml**
```yaml
custom:
  safeguards:
    location: ./policies
    policies:
      - stage-in-table-name
```

### Adding settings to your policy

Custom policies may also include configuration parameters. The policy function
accepts a third parameter (`options` in the example below) which contains the
settings defined in the `serverless.yml` file.

**./policies/my-custom-policy.js**
```javascript
module.exports = function myCustomPolicy(policy, service, options) {
  // options.max = 2
  policy.approve()
}
```

**serverless.yml**
```yaml
custom:
  safeguards:
    location: ./policies
    policies:
      - my-custom-policy:
          max: 2
```
