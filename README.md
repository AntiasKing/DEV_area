# DEV_area

The AREA is a EPITECH student project. The goal of this project is to discover, as a whole, the software node.js and react through the creation of a business application.
To do this, We implement a software suite that functions are similar to that of IFTTT and Zapier.

The project have three different parts :
                            • The Web client - to use the application from your browser by querying the application server
                            • The Mobile App client - to use the application from your phone by querying the application server
                            • The Server - to implement all the features listed below

# The Web client:
### ROUTE:

All the route provide localhost:{port} before the route selected

Welcome Page :          /
Login :                 /sign-in
Register :              /register
Dashboard :             /dashboard
Services :              /dashboard
Creation d'applets :    /createApplet

####  Welcome Page

This page is used like a lobby, it's provide as a selector to choose if you want to login or register to the AREA project.

####  Login

The login page allow you to log in the AREA project. You can choose to be logged in as a local conection or you can be connected with all the services we provide to you. You have the choice between Facebook, Twitter, Google, Twitch and Spotify.
All the connection are "smart" and detect if you are already connected with another service to combine the services connection.

####  Register

The Register page allow you to register to the AREA project if it's not already done yet. As the login page, You can register as a local user thanks to a username, an email and a password, or you can also choose to use the Service connection. Like the Login page, you have the choice between Facebook, Twitter, Google, Twitch and Spotify as services.

####  Dashboard

On the Navigation Bar, the name of the project is on the top left, there is a button that allow you to go to the Applet creator on the top right and right under you have two button, one for the applet screen (where we are), and another one for the services connection selector.

The Dashboard page is the place where all the applets you have created before are shown. If you have no Applets, the page will tell you.
The Applets are create by the server and this page detect and print the applet. 
Every Applets contain the same format, A trash that allow you to delete the applet selected, a sentence who contain : "When {Action} : {Reaction}"
On the bottom of the applet you have a footer with the Icon and the Name of the applet's service and a button for the on/off of the applet. The Applet have the color of the service.

####  Services

On the Navigation Bar, the name of the project is on the top left, there is a button that allow you to go to the Applet creator on the top right and right under you have two button, one for the applet screen, and another one for the services connection selector (where we are).

The Services page is the place where you can connect your account to all the extern services, when you are connected to a services, it allow you to create actions/reactions with this service.

####  Creation d'applets

On the Navigation Bar, the name of the project is on the top left, there is also a button that allow you to go back to the dashboard route, you have right under, a follow of the creation of an applet to see where you are in the step of the creation.

All the step are : Service Action --> Action --> Extra --> Service Reaction --> Reaction --> Extra --> Good job

Service Action : Select a service for the action, show only the connected services
Action : Select an action from the service selectionned
Extra : Show an extra page if you need to add a parameter on the action
Service Reaction : Select a service for the reaction, show only the connected services
Reaction : Select a reaction from the service selectionned, show only the reaction who work with the action
Extra : Show an extra page if you need to add a parameter on the reaction
Good job : You can now go back to the dashboard, the apple thas been create



# The Mobile client:
### ROUTE:

All the route provide localhost:{port} before the route selected

Login :                 /sign-in
Register :              /register
Dashboard :             /dashboard
Services :              /dashboard

####  Login

The login page allow you to log in the AREA project. You can choose to be logged in as a local conection or you can be connected with all the services we provide to you. You have the choice between Facebook, Twitter, Google, Twitch and Spotify.
All the connection are "smart" and detect if you are already connected with another service to combine the services connection.

####  Register

The Register page allow you to register to the AREA project if it's not already done yet. As the login page, You can register as a local user thanks to a username, an email and a password, or you can also choose to use the Service connection. Like the Login page, you have the choice between Facebook, Twitter, Google, Twitch and Spotify as services.

####  Dashboard

On the Navigation Bar, the name of the project is on the top left, there is a button that allow you to go to the Applet creator on the top right and right under you have two button, one for the applet screen (where we are), and another one for the services connection selector.

The Dashboard page is the place where all the applets you have created before are shown. If you have no Applets, the page will tell you.
The Applets are create by the server and this page detect and print the applet. 
Every Applets contain the same format, A trash that allow you to delete the applet selected, a sentence who contain : "When {Action} : {Reaction}"
On the bottom of the applet you have a footer with the Icon and the Name of the applet's service and a button for the on/off of the applet. The Applet have the color of the service.

####  Services

On the Navigation Bar, the name of the project is on the top left, there is a button that allow you to go to the Applet creator on the top right and right under you have two button, one for the applet screen, and another one for the services connection selector (where we are).

The Services page is the place where you can connect your account to all the extern services, when you are connected to a services, it allow you to create actions/reactions with this service.



# The Server client:

The server client is private, you can use the API to use it, by follow the instruction on the API rest on heroku.
