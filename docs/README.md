# Serverless Framework Enterprise - Overview

Serverless infrastructure is a new type of cloud infrastructure that auto-scales and charges you only when it's used.  If you embrace it to build your applications, you will reduce overhead, innovate more and move incredibly fast.

However, many teams and organizations don't know how to do serverless development, let alone cloud development.  So, we built the [Serverless Framework Enterprise](https://www.serverless.com) to help them.  It includes everything teams and organizations need to practice serverless development safely, and deliver results faster than ever.

## Product Features

The Serverless Framework Enterprise contains the following features:

### Serverless Insights

Metrics and alerts for your serverless applications.  Serverless Insights help you monitor and optimize your serverless applications.

### [Serverless Safeguards](./safeguards.md)

Pre-configured operational and security best practices. Serverless Safeguards performs a series of policy checks when running the serverless deploy command.

## Concepts

After a few years of doing serverless development, we've designed the best possible abstractions for reasoning about serverless applications while preserving the option to deep dive into the underlying infrastructure when necessary.

Here's an overview of our concepts/abstractions and how they fit together:

```
- Tenant
  - Applications 
    - Services
      - Functions
      - Events
      - Subscriptions
      - Resources
```

### Tenant

A Tenant is a secure workspace which can contain one or many Applications.  Think of it like a Github repository.

Every Serverless Framework Enterprise user gets a Tenant when they register.  They can invite others to their Tenant to collaborate on the Applications within that Tenant.

Tenants are most often created for a team, a line of business, or an individual's personal workspace.

### Application

A serverless Application is built on serverless infrastructure, typically using Functions-as-a-Service (e.g. AWS Lambda) along with other serverless resources (e.g. DynamoDB, Aurora, Kinesis).

The Serverless Framework Enterprise uses the Application concept as a unit of organization for grouping related logic and infrastructure (like any other software application).

Examples of Applications:

- An entire web, mobile or IoT application
- A single Function

### Service

A serverless Service is designed to be a smaller unit of organization than an Application.  Services group together resources that have a lot of interdependencies.  For example, a group of Functions and Resources (e.g. a database) pertaining to your Application's *Users* or *Products*.

An Application can have many Services.  They seek to help you break up large Applications so you can have smaller stacks of infrastructure which you or your team can work on autonomously, without affecting the Application as a whole.  Services can also be used within different Applications.

They are declared by a `serverless.yml` file and provisioned with the [Serverless Framework open-source CLI](https://www.github.com/serverless/serverless).

Examples of Services:

- A data model's database and logic (e.g. users, products, blog posts).
- A workflow of Functions and Events.
- An entire Application can be put into one Service.

### Function

A serverless Function is a small amount of business logic/code, usually designed to perform one task.  This logic is typically run on a Functions-as-a-Service/serverless compute service, like AWS Lambda, Azure Functions or Google Cloud Functions.  A serverless Function can also be in a container.

Examples of Functions:

- Typical microservice use-cases, like saving a user to a database or processing events asynchronously.
- Transforming a piece of data and sending it to another destination.
- Running GraphQL.
- Building an Alexa Skill.

### Event

An Event is a data record expressing an occurrence and its context. Events are a central concept to serverless Applications because serverless compute/Functions-as-a-Service are largely event-driven.  Events trigger serverless Functions.

Examples of Events:

- A piece of state that has changed (e.g. user updated)
- A notification that something has happened (e.g. an IoT light turned on)
- A synchronous command or request (e.g. an HTTP request)

### Subscription

A Subscription is an instruction to call a Function when an Event is received.  Subscriptions are made between external sources and Functions directly (e.g. AWS + AWS S3).

### Resource

A serverless Resource is any serverless infrastructure included in your Application/Service, like databases, CDNs, caches, etc.

Examples of Resources:

- AWS S3
- AWS DynamoDB
- AWS Kinesis
- AWS AppSync
- Auth0
- Stripe
- Twilio
