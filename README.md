
## Getting started

## Installation
-install node packages
    $ npm install 
-install nest
    npm i @nestjs/cli (For localy install)     [npm i -g @nestjs/cli] (For globally install)

create new project 
nest new nest_assestment

Running the app
# development
$ npm run start

# watch mode
$ npm run start:dev

## Configuration
Create a .env and .env.development files in the root diectory, add the following keys, and provide values of your choice to the keys without values:

DB_DIALECT
DB_HOST=
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_NAME
DB_ALTER_TABLE
TEST_DB_NAME

These keys will be used throughout the project for the database connection and DB_NAME is the name of the database that the project will 

## Nest.js API

[post] http://localhost:3000/api/v1/form

This will story form title & all other required fields

[post] http://localhost:3000/api/v1/form/fill-data?title=Form3

This will submit all form values by getting form fields via form title.

[GET] http://localhost:3000/api/v1/form/show-data?title=Form3
 
 This is to get all submitted form data via form title.

