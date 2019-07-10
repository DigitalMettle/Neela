# Neela
Provides limited client visibility into Azure DevOps.
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

#### 3) After deploying application, register your app on https://app.vsaex.visualstudio.com/app/register. by selecting scope “Work items (read and write)” and put appropriate “Authorization Callback Url”.

#### 4) After registeration you will get the following keys-
        * App secret (Client Secret)
        * Authorize url 
        * Access token url
        * Select the authorize scope "vso.work_write"  
        * App Id

#### 5 ) You have to update following fields of AppSettingOauth with the keys which you got after registation in AppSettings.Production.json :

"AppSettingOauth": <br/>
{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"AppId": "**{App Id}**",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"AppSecret":  "**{App Secret}**" (Client Secret),<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"Scope": "vso.work_write",
&nbsp;&nbsp;&nbsp;&nbsp;"CallbackUrl": "**{Your domain name}**/oauth/callback"<br/>
}<br/>

#### 5) You have to update following settings of VSTS in  AppSettings.Production.json :

"VSTS":<br/> 
{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"AccountName": "**{your account name}**",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"ByPassRules": "true",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"UserProfileUrl": "https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=1.0",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"GroupListUrl": "https://**{your account name}**.vssps.visualstudio.com/_apis/graph/groups?api-version=4.1-preview.1",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"GroupMembersUrl": "https://**{your account name}**.vsaex.visualstudio.com/_apis/GroupEntitlements/{0}/members?api-version=4.1-preview.1",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"VSTSGroupName": "**{vsts administrator group name}**",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"PersonalAccessToken": "**{Personal Access Token}**",<br/>
}

#### For example: <br/>
"VSTS":<br/> 
{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"AccountName": "**xyz**",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"ByPassRules": "true",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"UserProfileUrl": "https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=1.0",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"GroupListUrl": "https://**xyz**.vssps.visualstudio.com/_apis/graph/groups?api-version=4.1-preview.1",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"GroupMembersUrl": "https://**xyz**.vsaex.visualstudio.com/_apis/GroupEntitlements/{0}/members?api-version=4.1-preview.1",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"VSTSGroupName": "**VSTDesk Administrators**",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"PersonalAccessToken": "**nxnayky6qr6hyic3o7zjnqnwc657hl27crq76bih6cankohnljyq**"<br/>
}

**6) For Account Name :** Your VSTS account name

**7) For GroupListUrl and Group Member Url :** You need to put your account name as specified in above example

**8) For VSTSGroupName :** Go to Organization section at VSTS --> Organization Settings --> Security --> Add group. Enter group name and add members. While configuring put this group name in app settings <**VSTSGroupName**> key like we have put same for {**vsts administrator group name**} at step #6.

**9) For Personal Access Token :** You have to create a Personal Access Token from security section of your VSTS account and have to put same at required space in VSTS section of AppSettings.Production.json as specified in above example.

**10) After generating Personal Access Token, you have to switch ON all OAuth policy from following url :** https://{**your account name**}.visualstudio.com/_admin/_policy

**11) For email setting :** You have to setup SMTP Settings in System Settings view of admin section.

**12)** You need to run the following script : "NeelaScript.sql"

**13)** Execute following script : 

    insert into WorkItemTypes values('Bug')<br/>
    insert into WorkItemTypes values('Epic')<br/>
    insert into WorkItemTypes values('Feature')<br/>
    insert into WorkItemTypes values('Issue')<br/>
    insert into WorkItemTypes values('Retrospection')<br/>
    insert into WorkItemTypes values('Task')<br/>
    insert into WorkItemTypes values('User Story')<br/>
    insert into WorkItemTypes values('Test Case')<br/>

**14) For database connection string :** You need to add the connection string in AppSettings.Production.json following Field

"ConnectionStrings":<br/>
{<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;"DefaultConnection": "{**Database Connection String**}"<br/>
}

**15)** After updating all keys restart your application at server.

## About VSTDesk

There are two modules in this application :<br/>
    **1)** Admin Module<br/>
    **2)** Customer Module

#### 1) Admin Module: Admin module has following links -
        
  &nbsp;&nbsp;&nbsp;&nbsp;**1.1 DashBoard :** This link show the charts User Assigned Per Project and has a button Sync projects which will sync all VSTS project into the system.
  **Note :** If you login first time in the system you have to press the Sync Project button before using the system.
        
  &nbsp;&nbsp;&nbsp;&nbsp;**1.2 Admin Project Settings :** This is the project settings from here we can customize every project so only those things will be visible to customer which we set here for the project.
        
  &nbsp;&nbsp;&nbsp;&nbsp;**1.3 Invite Users :** From Here user can send the invite request to the customer email address.
        
  &nbsp;&nbsp;&nbsp;&nbsp;**1.4 Users :** Here all users list will be visible.
        
  &nbsp;&nbsp;&nbsp;&nbsp;**1.4 Company Project Settings :** From Here you can set the company Logo and Message which will show on the login page.

#### 2) Customer Module:  Customer module has following links -

  &nbsp;&nbsp;&nbsp;&nbsp;**2.1 Dashboard :** Customer dashboard has a chart which show the number of work items and their state per project.
  
  &nbsp;&nbsp;&nbsp;&nbsp;**2.2 Work Items :** Show the work items per project. For here user can create a new work item and can comment for work item.
  
  &nbsp;&nbsp;&nbsp;&nbsp;**2.3 My Profile :** User can see their profile and can update it.

