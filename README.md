# Neela
Facilitates you to manage your project.
# Prerequisites


There are maily two way you can use the code.
By downloading and uploading a zip code
By downloading a source code.

## 1). Downloading and uploading a zip code on Azure web app.
First we need to create azure webapp.
In the Azure Portal, click Create a resource > Web + Mobile > Web App.

#### Select your subscription.

If you have multiple subscriptions be aware that to create an app in your App Service Environment, you need to use the same subscription that you used when creating the environment.

#### Select or create a resource group.

Resource groups enable you to manage related Azure resources as a unit and are useful when establishing role-based access control (RBAC) rules for your apps. For more information, see Azure Resource Manager overview.

#### Select an App Service plan.

App Service plans are managed sets of web apps. Normally when you select pricing, the price charged is applied to the App Service plan rather than to the individual apps. In an ASE you pay for the compute instances allocated to the ASE rather than what you have listed with your ASP. To scale up the number of instances of a web app you scale up the instances of your App Service plan and it affects all of the web apps in that plan. Some features such as site slots or VNET Integration also have quantity restrictions within the plan. For more information, see Azure App Service plans overview

You can identify the App Service plans in your ASE by looking at the location that is noted under the plan name.

If you want to use an App Service plan that already exists in your App Service Environment, select that plan. Create an App Service plan in an App Service Environment.

Enter the name for your web app, and then click Create.

#### Deploy the zip on Webapp

If your ASE uses an External VIP the URL of an app in an ASE is: [sitename].[name of your App Service Environment].p.azurewebsites.net instead of [sitename].azurewebsites.net
In the browser, navigate to https://<app_name>.scm.azurewebsites.net/ZipDeploy.

Upload the ZIP file you created in Create a project ZIP file by dragging it to the file explorer area on the web page.

When deployment is in progress, an icon in the top right corner shows you the progress in percentage. The page also shows verbose messages for the operation below the explorer area. When it is finished, the last deployment message should say Deployment successful.

## 2). Download a source code
Push your code to VSTS and implement the CICD by using following steps:

#### Create a new build on VSTS or Azure DevOps and add the following tasks
![image](https://user-images.githubusercontent.com/40165674/46529623-c5066800-c8b4-11e8-9060-7003d1ec26e7.png)

#### Create a new release for this build and add the following tasks
![image](https://user-images.githubusercontent.com/40165674/46529795-668db980-c8b5-11e8-95ce-c41a26c1e018.png)

Create a pipeline between them:

![image](https://user-images.githubusercontent.com/40165674/46531476-fbdf7c80-c8ba-11e8-820b-1d071749c69a.png)


