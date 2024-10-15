## Description

A rest API that provides the following functionalities:

1. **PDF Upload:**
   - Allow users to upload multiple PDFs from their local device.
2. **Storage:**
   - Securely store the uploaded PDFs within the application for subsequent processing.

I have hosted a postgres database on a cloud sever details of which can be found in the env example

Note: You will get a ssl self-signed warning whilst running locally, in the command below in the terminal before starting the app

otherwise you can spin up a docker instance of a pg database with `docker-compose -up`

```bash
$ export NODE_TLS_REJECT_UNAUTHORIZED='0'
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

- Rename .env.example to .env

```bash
# development
$ npm run start:dev
```

## Routes Documentation

`http://localhost:3000/api#/`

## Features

- Auth Register->Login->Logout Flow using JWT
- File upload using multa and fileinterceptor
- File-User many to one relationship
- Store file on local disk

## Improvements given more time

- More defensive programming
- Better detailed swagger documentation
- Better structured layout and separation of components (Especially the login and register)
- Write unit test (ignored due to time considerations)
