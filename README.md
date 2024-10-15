## Description

A rest API that provides the following functionalities:

1. **PDF Upload:**
   - Allow users to upload multiple PDFs from their local device.
2. **Storage:**
   - Securely store the uploaded PDFs within the application for subsequent processing.

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

## Improvements/ TODO

- More defensive programming
- Better detailed swagger documentation
- Write unit test
- Upload/recieve to/from S3 bucket
