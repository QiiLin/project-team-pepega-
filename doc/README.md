# Magic Video REST API Documentation

## Authentication API

### Authentication

- description: Authenticate the user given the email and password
- request: `POST /api/auth`
    - content-type: `application/json`
    - body: object
            - email: (string) the email of the user
            - password: (string) the password of the user
- response: 200
    - content-type: `application/json`
    - body:object
            - id: (string) the id of the authenticated user
            - name: (string) the name of the authenticated user
            - email: (string) the email of the authenticated user
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) User does not exist
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) Please enter all fields
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid credentials

- description: Get the current user data
- request: `GET /api/auth/user`
    - content-type: `application/json`
    - body: object
            - isNotAuth: (bool) Whether the user is authenticated

## Edit API

## Items API

## User API