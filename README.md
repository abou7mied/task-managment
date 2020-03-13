# Task Management Project

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
