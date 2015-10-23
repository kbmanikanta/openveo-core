# What's OpenVeo ?

OpenVeo is a [Node.js](http://nodejs.org/) and [AngularJS](https://angularjs.org/) CMS. It embeds an HTTP server based on [Express framework](https://www.npmjs.com/package/express) and a plugin loader mechanism.

The core of the system (i.e. without any plugin) offers a simple connection form to the administration interface.

This interface gives access to a limited set of default features:

-  Users management
-  Permissions and roles management
-  Web service management
-  A profile page

# HTTP server

Based on [Express framwork](https://www.npmjs.com/package/express), OpenVeo creates an HTTP server with a list of routes.
Routes are mounted on **/** while plugins routes are mounted on **/PLUGIN_NAME** with PLUGIN_NAME the name of the plugin.
There are two categories of routes :

- Public routes : Routes accessible to anyone who has access to the url
- Private routes : Routes accessible only to users authenticated to the back end

# Back end

OpenVeo core offers a back end as an AngularJS single page application accessible on **/be**. Without plugins, the back end has only limited features (users, roles, web service, profile page). And without plugins no front end is created. This is an important point. There is no generic front end, each plugin can define its own front pages on **/PLUGIN_NAME** base path.

# Web Service

OpenVeo core can create a [Web Service](/web-service) (using the option **-w** when starting the server) mechanism based on oauth2 authentication. OpenVeo core, without plugins, does not expose any endpoints.

Through the back end you can create a new Web Service application with its associated list of scopes. Each new Web Service application will have an associated client id and client secret to authenticate to the Web Service. Thus you can create as many applications as you want with different scopes for each one.

# Plugins

OpenVeo core loads all plugins found in **node_modules/@openveo/** when starting the server. Each plugin can :

- Create its own back end pages
- Create public and private routes