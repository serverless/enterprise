# Notifications

Serverless Framework Enterprise can notify you in **Slack** or **Email** about any[alerts](./insights.md#alerts)
on your application. Multiple notfications can be added to an application and each can be configured
for different types and scoped to individual alerts, stages or services.

## Add a notification to an application

1. Navigate to the **applications** tab from the main menu.
2. Select the application for which you would like to configure the notifications and expand the application view.
3. Open the **notifications** tab in the application.
4. Follow the "**Click here to create your first notification.**" link.
5. Fill out the form and click **add notification** to save the new notification. The notifications can be scoped based on the **alerts**, **stages** or **services**.
    - **alerts** - select "all alerts" to be notified about all alerts, including alerts which may be made available in the future, or individually select the alerts. The [Alerts section](#alerts) provides more details on each of the available alert types.
    - **stages** - select "all stages" to be notified about alerts on all stages, including stages which may be created in the future, or individually select the stages. The [stages must be configured](./profiles.md#add-a-deployment-profile-to-your-application-and-stage) on the application first for them to be available.
    - **services** - select "all services" to notified about alerts on all services, including services which will be deployed in the future, or individually select the services.