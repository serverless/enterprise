# Updating a Serverless Framework app to Enterprise

If you already have an existing Serverless Framework application you can update it to use Serverless Framework Enterprise features like Safeguards and Insights.


* Update to the latest Serverless Framework
```sh
npm i -g serverless
```

* Login to your Serverless Framework Enterprise account
```sh
sls login
```

* Install the Serverless Framework Enterprise Plugin
```sh
sls plugin install -n @serverless/enterprise-plugin
```


* Deploy the new service
```sh
sls deploy
```
