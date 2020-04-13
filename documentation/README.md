# Magic Video REST API Documentation
Note: We are using webbase auth and csrf token and csrf token, so the cookie is need for all the request below
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
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) User does not exist
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid credentials
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) Please enter all fields
- response: 400
    - content-type: `application/json`
    - body: (string) bad input


- description: Get the current user data
- request: `GET /api/auth/user`
    - content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - body: object
            - _id: user id from database
            - name: user name
            - email: user email
            - register_date: account creation date
- response: 200
    - content-type: `application/json`
    - body: object
            - isNotAuth: (bool) Whether the user is authenticated
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied

## Edit API

### Caption
- description: adds caption for the created video
- request: `POST /api/edit/caption/:id`
    - content-type: `application/json`
    - body: object
        - uploader_id: (string) user id,
        - data: (object) ,
        - filename: filename
- response: 200:
    - content-type: `application/json`
    - body: object
        response: (string) Caption is added
- response: 202:
    - content-type: `application/json`
    - body: object
        response: (string) Caption is added with error: {actual error}
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing captions
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing user id
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing timestamps
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 500
    - content-type: `application/json`
    - body: object
            - msg: (string) An error occurred [Caption]: {The Actual error} 
    

- description: Append a video with id "idMerge" to the one with id "id"
- request: `POST /api/edit/merge/:id`
    - content-type: `application/json`
    - body: object
        - uploader_id: (string) user id,
        - data: (object),
        - filename: filename
- response: 200:
    - content-type: `application/json`
    - body: object
        response: (string) Merging is completed
- response: 202:
    - content-type: `application/json`
    - body: object
        response: (string) Merging is completed:{actual error}
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing user id
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing video id
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 500
    - content-type: `application/json`
    - body: object
            - msg: (string) An error occurred [Merge/MergeCombine]: {The Actual error} 



- description: Cut video section of a videoand move to a new timestamp
- request: `POST /api/edit/cut/:id/`
    - content-type: `application/json`
    - body: object
            - uploader_id: userid,
            - timestampStart: Unix time in second
            - timestampEnd: Unix time in second,
            - filename: filename
- response: 400
    - content-type: `application/json`
    - body: (string) timestamp required
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing user id
- response: 200:
    - content-type: `application/json`
    - body: object
        response: (string) Cut is completed
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 202:
    - content-type: `application/json`
    - body: object
        response: (string) Cut is completed:{actual error}
- response: 500
    - content-type: `application/json`
    - body: object
            - msg: (string) An error occurred [Cut]: {The Actual error} 


- description: Remove a section of the video
- request: `POST /api/edit/trim/:id/`
    - content-type: `application/json`
    - body: object
            - uploader_id: userid,
            - timestampStart: Unix time in second
            - timestampEnd: Unix time in second,
            - filename: filename
- response: 200:
    - content-type: `application/json`
    - body: object
        response: (string) trim is completed
- response: 202:
    - content-type: `application/json`
    - body: object
        response: (string) trim is completed:{actual error}
- response: 400
    - content-type: `application/json`
    - body: (string) timestamp required
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing user id
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 500
    - content-type: `application/json`
    - body: object
            - msg: (string) An error occurred [Trim1/Trim2/TrimCombine]: {The Actual error} 



- description: Add transition effects in a video at a timestamp
- request: `POST /api/edit/transition/:id/`
    - content-type: `application/json`
    - body:
        uploader_id: uploader_id,
        transitionType: transitionType,
        transitionStartFrame: start frame,
        transitionEndFrame: end framne,
        filename: filename
- response: 200:
    - content-type: `application/json`
    - body: object
        response: (string) Transition is completed
- response: 202:
    - content-type: `application/json`
    - body: object
        response: (string) Transition is completed:{actual error}
- response: 400
    - content-type: `application/json`
    - body: (string) timestamp required
- response: 400
    - content-type: `application/json`
    - body: (string) transition type required
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing user id
- response: 500
    - content-type: `application/json`
    - body: object
            - msg: (string) An error occurred [Transition]: {The Actual error} 


- description: Save the user recording into the database
- request: `POST /api/edit/saveMP3`
    - content-type: `multipart/form-data`
    - body: data
- response: 200
    - content-type: `application/json`
    - body: (string) Mp3 file saved
- response: 202
    - content-type: `application/json`
    - body: (string) Mp3 file saved: [err]
- response: 400
    - content-type: `application/json`
    - body: (string) Bad argument: Missing user id
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 500
    - content-type: `application/json`
    - body: object
            - msg: (string) An error occurred [saveMP3]: {The Actual error} 



## Items API

- description: Upload a file to the database
- request: `POST /api/items/upload`
    - content-type: multipart/form-data
    - body: 
        video: (binary) video binary data
        uploader_id: (string) user_id
- response: 200
    - content-type: `application/json`
    - body: object
            - msg: (string) Upload is completed
- response: 202
    - content-type: `application/json`
    - body: object
            - msg: (string) Upload is completed: [error]
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied


- description: Get all video files
- request: `GET /api/items/`
    - content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - body: array of object
        - object: 
        - _id: video id,
        - length: vidoe length
        - chunkSize: size
        - uploadDate: upload time
        - filename: filename
        - md5: md5
        - contentType: video type
        - metadata: 
            - uploader_id: user id
            - originalname original file name
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist



- description: Get the specified video file
- request: `GET /api/items/:id`
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist


- description: Display a single video file object
- request: `GET /api/items/thumbnail/:id`
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist
- response: 500
    - content-type: `application/json`
    - body: object
            - msg: (string) "read fail"


- description: Delete the video file with the specified id
- request: `DELETE /files/:id`
- response: 200
    - content-type: `application/json`
    - body: object
            - msg: (string) delete done
- response: 200
    - content-type: `application/json`
    - body: object
            -msg: (string) delete done without thumbnail
- response: 400
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) Invalid token
- response: 401
    - content-type: `application/json`
    - body: object
            - msg: (string) No token, authorization denied
- response: 404
    - content-type: `application/json`
    - body: object
            - msg: (string) No files exist

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