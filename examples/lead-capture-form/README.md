# Example – Serverless Lead Capture

This demo application helps you test Serverless Framework Enterprise's main features: ***Monitoring***, ***Secrets*** & ***Safeguards***

## Installation

#### Clone the repository

```shell
$ git clone https://github.com/serverless/enterprise.git
```

#### Install Front-End & Back-End Dependencies

```shell
# location - enterprise/frontend
$ npm i
```

```shell
# location - enterprise/backend
$ npm i
```

#### Log into Serverless Framework Enterprise

The Serverless Enterprise Plugin adds a `login` command to the Serverless Framework, use it like this...

```shell
# location - enterprise/backend
$ serverless login
```

#### Deploy the back-end

```shell
# location - enterprise/backend
$ serverless deploy
```

#### Run the front-end

```shell
# location - enterprise/backend
$ npm run start
```

## Testing Serverless Insights - Monitoring
