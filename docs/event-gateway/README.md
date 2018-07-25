# Event Gateway - Overview

Our applications, our lives, our world, can be considered a series of events, all awaiting a response.  But the average developer and organization has never had the capability to respond to these events at scale.  As a result, the ability to store, analyze, and act upon large amounts of data has been out of reach for those without significant resources.

Serverless computing (e.g. AWS Lambda) changes that. Thanks to its auto-scaling, pay-per-execution and event-driven qualities, it has never been easier and more economical to write vast amounts of logic to do *anything*.

Serverless computing democratized computing.  We created the Event Gateway to democratize data.

## Description

The Event Gateway is a new type of event router for the serverless era.  It does not store Events.  What it excels at is distributing them.  This enables incredible possibilities.

The Event Gateway's practical purpose is to provide an easy way to integrate your existing workloads and data with serverless compute/functions.  Its larger vision is to empower you and your organization to respond to any event that can possibly happen, with code.

The Event Gateway is designed to work with serverless Functions located on any provider or platform (e.g. AWS Lambda, Azure Functions, Google Cloud Functions, Kubernetes).  This enables you to process events wherever you'd like.

The project itself is open-source infrastructure built and maintained by us ([Serverless Inc.](https://www.serverless.com)).  You can find [its public Github repo here](https://github.com/serverless/event-gateway).  It's designed so that anyone can easily run it.

We ([Serverless Inc.](https://www.serverless.com)) also operate a hosted (aka "serverless") version of the Event Gateway, which you can use without having to worry about operating the infrastructure.

This technical documentation is focused on the hosted version of the Event Gateway.  If you'd like to learn more about the open-source project, its documentation is kept separately [here in the Github repo](https://github.com/serverless/event-gateway/tree/master/docs).  Given the hosted and open-source versions are very similar, a lot of the documentation and examples here will apply to the open-source version as well.

Lastly, many of our enterprise users operate their own instance of the Event Gateway and use it with the [Serverless Framework](https://github.com/serverless/serverless) and our [Serverless Dashboard](https://dashboard.serverless.com/).  If this is of interest to you, [contact us](https://www.serverless.com/enterprise)

## Next Steps

If you're new to the Event Gateway, look at the [Basic Concepts](./basic-concepts.md) document for an explanation of the core concepts in the Event Gateway.

If you would like to deploy your first application with the Event Gateway, check out the [Getting Started](./getting-started.md) example.

If you want more information on how to configure the Event Gateway, you can use the [Configuration](./configuration.md) document.