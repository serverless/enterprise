# Overview

Serverless infrastructure is a new type of cloud infrastructure that auto-scales and charges you only when it's used.  If you embrace it to build your applications and business logic, you will reduce overhead, innovate more and move incredibly fast.

However, many teams and organizations don't know how to do serverless development, let alone cloud development.  We built the [Serverless Platform](https://www.serverless.com) to help them.  It includes everything teams and organizations need to practice serverless development safely, and deliver results faster than ever.

## Product Areas

The Serverless Platform currently contains three product areas:

### Serverless Framework

The serverless application framework.  Use it to build, deploy and update serverless applications across vendors.

### Serverless Dashboard

The serverless operations console.  Monitor, collaborate and secure your serverless applications.

### Event Gateway

The serverless integration infrastructure.  Connect your serverless applications and functions to your existing workloads and services.

Out-of-the box, the Serverless Platform features a hosted version of the Serverless Dashboard and a hosted version of the Event Gateway, all of which are run and operated by us, Serverless Inc.

You can also self-host the Event Gateway and plug it into the Serverless Platform.  This is a fit for you if your company has extra-sensitive data.  If this is of interest to you, inquire about it [here](https://serverless.com/enterprise/).

## Concepts

After multiple years of doing serverless development, we've created the best possible abstractions for reasoning about serverless applications.  Here's what they are and how they fit into a hierarchy:  

- Tenant / Event Gateway
  - Application
    - Services
      - Functions
      - Events
      - Subscriptions
      - Resources

### Tenant

A Tenant is a secure workspace which can contain one or many Applications.  Every Serverless Platform user gets a Tenant when they register.  They can invite others to their Tenant, to collaborate on the Applications within that Tenant.

### Event Gateway

Every Tenant comes with a hosted Event Gateway.  This Event Gateway is shared across all Applications in your Tenant, enabling you to share Events across Applications easily, and react to them with serverless Functions.

You will want to create a Tenant for your personal Applications and create other Tenants for your teams or entire organization.

### Application

A serverless Application is built on serverless infrastructure, typically using Functions-as-a-Service (e.g. AWS Lambda) along with other serverless infrastructure (e.g. DynamoDB, Aurora, Kinesis).  

The Serverless Platform merely uses the Application concept as a unit of organization for related logic and infrastructure (like any other software application).

That said, logic built within an Application on the Serverless Platform is not isolated to that Application.

### Service

A serverless Service is declared by a `serverless.yml` file and is a smaller unit of organization than an Application that groups together resources that have a lot of interdependencies.  For example, a group of Functions and Resources (e.g. a database) pertaining to your Application's *Users* or *Products*.  

The Service concept seeks to help you break up large Applications so you can have smaller stacks of infrastructure which you can change without affecting the Application as a whole.  This also helps team autonomy, as teams can fully own a Service and work on it independently.

### Function

A serverless Function is a

### Event

### Subscription

### Resource
