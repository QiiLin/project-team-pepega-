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

- description: adds caption for the created video
- request: `POST /api/edit/caption/:id`
    - content-type: `text/plain`
    - body: 
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing captions
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing user id
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing timestamps

- description: Append a video with id "idMerge" to the one with id "id"
- request: `POST /api/edit/merge/`
    - content-type: `text/plain`
    - body: 
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing user id
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing video id

- description: Cut video section of a videoand move to a new timestamp
- request: `POST /api/edit/cut/:id/`
    - content-type: `text/plain`
    - body: 
- response: 400
    - content-type: `text/plain`
    - body: (string) timestamp required
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing user id

- description: Remove a section of the video
- request: `POST /api/edit/trim/:id/`
    - content-type: `application/json`
    - body:
- response: 400
    - content-type: `text/plain`
    - body: (string) timestamp required
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing user id

- description: Add transition effects in a video at a timestamp
- request: `POST /api/edit/transition/:id/`
    - content-type: `application/json`
    - body:
- response: 400
    - content-type: `text/plain`
    - body: (string) timestamp required
- response: 400
    - content-type: `text/plain`
    - body: (string) transition type required
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing user id

- description: Save the user recording into the database
- request: `POST /api/edit/saveMP3`
    - content-type: `application/json`
    - body:
- response: 200
    - content-type: `text/plain`
    - body: (string) Mp3 file saved
- response: 202
    - content-type: `text/plain`
    - body: (string) Mp3 file saved: [err]
- response: 400
    - content-type: `text/plain`
    - body: (string) Bad argument: Missing user id

## Items API

- description: Upload a file to the database
- request: `POST /api/items/upload`
    - content-type: 
    - body: 
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 200
    - content-type: `application/json`
    - body: object
            - msg: (string) Upload is completed
- response: 202
    - content-type: `application/json`
    - body: object
            - msg: (string) Upload is completed: [error]

- description: Get all video files in JSON
- request: `GET /api/items/`
    - content-type:
    - body:
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist

- description: Get the specified video file
- request: `GET /api/items/:id`
    - content-type:
    - body:
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist

- description: Display a single video file object
- request: `GET /api/items/thumbnail/:id`
    - content-type:
    - body:
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist

- description: Delete the video file with the specified id
- request: `DELETE /files/:id`
    - content-type:
    - body:
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist
- response: 200
    - content-type: `application/json`
    - body: object
            - msg: (string) delete done
- response: 200
    - content-type: `application/json`
    - body: object
            -msg: (string) delete done without thumbnail

## User API

- description: register a new user
- request: `POST /api/users`
    - content-type:
    - body:
- response: 400
    - content-type: `application/json`
    - body: object
            -msg: (string) Please enter all fields
- response: 400
    - content-type: `application/json`
    - body: object
            -msg: (string) User already exists