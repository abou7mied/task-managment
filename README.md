# Task Management Project
[![Build Status](https://travis-ci.org/abou7mied/task-managment.svg?branch=master)](https://travis-ci.org/abou7mied/task-managment)
[![codecov.io](https://codecov.io/github/abou7mied/task-managment/coverage.svg?branch=master)](https://codecov.io/github/abou7mied/task-managment?branch=master)

Backend for Task Management sample project.
## API endpoints
- GET​ ​ /api/users​ ​ - ​ ​ responds with a list of users.​ ​Can be filtered by name and
surname.​
- GET​ ​ /api/tasks​ ​ - ​ ​ responds with a list of tasks.​ ​Can be filtered by name,
description,​ ​ status ​ array (boolean OR operation filter),​ ​ name/surname of the assigner,
name/surname/id of the assignee(s) ​ and by score.​
- GET​ ​ /api/projects​ ​ - responds with a list of users.​ ​ Can be filtered by name,
description of the project,​ ​ status ​ array (boolean OR operation filter),​ ​ name/surname of
the assigner, name/surname/id of the assignee(s) ​ and by score of the tasks.​
- POST​ ​ /api/tasks​ ​ - ​ creates a task
- POST​ ​ /api/projects​ ​ - ​ ​ creates a project
- POST​ ​ /api/users​ ​ - ​ creates a user

## Configuration
There is two env variables:

`HTTP_PORT` is the port of the http server

`POSTGRES_URL` is posgres database url.

or you can create .env file instead
```dotenv
HTTP_PORT=3000
POSTGRES_URL=postgres://username:password@localhost:5432/databse
``` 

## Installation
```bash
# install dependencies
npm install

# run
npm run start
```
## Technologies
- koa (HTTP framework)
- sequelize (ORM)
- inversify (dependency injection)
- ajv (data validation)
