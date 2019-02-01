# Updating an existing Service to use Serverless Safeguards and generate Serverless Insights

In order to take advantage of all Serverless Framework Enterprise features you will need to be running Serverless Framework open source CLI version 1.36.3 or later and have installed the Enterprise Plugin.  If you already have a Serverless Framework Enterprise dashboard account with at least one configured Tenant and App, and have successfully deployed a Service into that App, follow these steps:

Update to Serverless Framework 1.36.3 or later
```sh
$ npm i -g serverless
```

Install the Serverless Framework Enterprise Plugin
```sh
$ sls plugin install -n @serverless/enterprise-plugin
```

Include your Tenant and App name in your sls yaml file
```sh
tenant: your-tenant-name 
app: your-app-name
```

Login to your Serverless Framework Enterprise account from your Framework CLI
```sh
$ sls login
```

Redeploy your service
```sh
$ sls deploy
```

# Explore Serverless Safeguards and Serverless Insights by deploying a sample Service Template

You can also explore Insights and Safeguards by deploying our Enterprise Template.

Create a new Serverless Service/Project
```sh
$ serverless create -n my-service -u https://github.com/serverless/enterprise-template
```

Change into the newly created directory
```sh
$ cd my-service
```

Install Serverless Enterprise dependencies
```sh
$ npm install
```

Include your Tenant and App name in your sls yaml file
```sh
tenant: tenantname # NOTE: change this to your tenant name
app: appname # NOTE: change this to your app name
```

Login to your Serverless Framework Enterprise account from your Framweork CLI
```sh
$ sls login
```

Deploy the Enterprise Template service
```sh
$ sls deploy
```

Test your service by hitting the returned endpoint.  Find the endpoint URL in the `sls deploy` output and use that instead of the URLs below:
```sh
$ curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/hello # no error
```

If you want to see how Serverless Insights reports errors in the Serverless Framework dashboard use this command instead:
```sh
$ curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/hello --data-binary 'not a json string' # causes a JSON parsing error so error Insights will populate
```

Test your function by invoking it from your CLI
```sh
$ sls invoke -f hello # no error
```

If you want to see how Serverless Insights reports errors in the Serverless Framework dashboard use this command instead:
```sh
$ sls invoke -f hello -d '{"body": "not a json string"}' # causes a JSON parsing error so error Insights will populate
```

