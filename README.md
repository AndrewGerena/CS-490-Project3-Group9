# MyDay Planner
*Have you ever thought about having an app where you are able to plan your daily task, view your local weather as well as read daily news? MyDay is just that app, with the help of  MyDay app users are able to achieve all of the above functionalities rather than navigating through google for each topic.*

## Heroku Link
https://shrouded-lowlands-20943.herokuapp.com/

## Eslinting Rules
*Below we describe the rules we chose to silence and why these decisions were made.*

**react/jsx-filename-extension**\
This rule was also ignored during Project 2 so it was a simple decision to ignore it for this project. We do not want to name our files with a .jsx extension.\
**import/no-named-as-default**\
This rule asked us to change the name of an imported file to be different than its default name. This caused confusion and seemed unnecessary.\
**import/no-cycle**\
We have yet to figure out a solution to this error. We must import certain functions for our code to work, but importing files from one another will display this error.\
**no-alert**\
We show an alert to let the user know they have successfully signed into the application.\
**no-console**\
The console was heavily used during development to make sure correct information was being delivered.\
**react/prop-types**\
It is likely that we could have kept this rule in place, but fear of bugs in prop-typing led us to decide against it. We do not often use prop-typing an are slightly unfamiliar with its syntax.\
**dot-notation**\
We use dot notation when unnecessary, but we did not let eslint force us into using it for every instance.\
**prefer-template**\
This rule flags use of string concatenation, but concatenation use within our code was harmless and quite helpful. We decided that it would be more effective to continue using string concatenation.

## Pylinting Rules\
*Below we describe the rules we chose to silence and why these decisions were made.*

**no-member, wrong-import-position, invalid-envvar-default, global-statement**\
We began by silencing the same rules that were silenced for Project 2. These rules complained about code that is necessary to function correctly.\
**too-few-public-methods**\
We need to ignore this rule for our database. We do not have many public methods in the file but it is a crucial aspect of our program.\
**line-too-long**\
We likely no longer need to ignore this rule and we can look to re-implement it in Sprint 2.\
**too-many-locals, too-many-statements**\
Our Weather Page needs a large number of variables and statements to display several days' worth of weather. These rules were ignored to allow the display of this information.\
**cyclic-import**\
Similar to the *import/no-cycle* rule in eslint, we are required to import certain functions from files within our programs. This error was unavoidable, so we were forced to silence it.\
**duplicate-code**\
For a time, we were migrating code from one file into another. We silenced this error so we could integrate our code into one cohesive application without the terminal always reminding us that our code was similar.
