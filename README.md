# To-do Application

## Application Overview

This application was developed with the purpose of improving my skills on NodeJs. The API was build using a RESTFUL architecture and Tested with Jest and Supertest libraries.

Mongodb was the database of choice with Mongoose as the ODM library to manage the data. A one to many relationship between User model and To-do model was used in order to enable each user to have unique to-dos.

For password security, the library bcrypt was installed. JWT library was used to generate tokens to validate and authenticate users, in order to permit the listing, creation, update and deletion of their own to-dos.

The Front end of the Application was built using the React library and the repository can be cloned at
[https://github.com/andresrgallo/to-do-client.git](https://github.com/andresrgallo/to-do-client.git).

The application can be seen life at:
[https://mytodoslist.netlify.com/](https://mytodoslist.netlify.com/).

## Running the app

### `$ https://github.com/andresrgallo/to-do-api.git`

### `$ cd to-do-api`

### `$ npm install`

### `$ npm start`

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

# Running the Tests

### `$ npm test`

### `type <a> to run all the tests`
