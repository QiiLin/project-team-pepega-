# Team Pepega - Project Proposal
## Project Title  
* Magic Video
## Team Members  
* Botao Martin Liang  
* Harrison Fok  
* Qi Lin  
## Description of the web application  
* This web application is used for in-browser video editing, and allows users to upload and download the edited video. Note: We are thinking about adding the idea of user account to this platform and allowing users to share their video with others.
## Description of the key features that will be completed by the Beta version
* Video captioning
* Splicing multiple videos together
* Able to trim a part of the video 
* Adding audio files & images to videos
* Basic Transition effects (e.g. Fade In, Fade Out)
## Description of additional features that will be complete by the Final version
* Preview of the edited video
* Interactable video timeline (e.g. can drag & drop clips)
* Able to chroma key in images (e.g. the dog shown in class)
* Able to chroma key in videos
* Able to add your voice into the video (via the user’s microphone)
* Users can get help using from the “Get Help” section (search of words)
## Description of the technology that we will use
* MongoDB
* ExpressJS
* ReactJS
* NodeJS
* Deploy on Heroku
* The following are JavaScript libraries that we are considering using:
  * https://github.com/Kagami/ffmpeg.js
  * https://github.com/moviemasher/moviemasher.js
  * https://github.com/gka/chroma.js/
  * https://github.com/ThreadsStyling/video-renderer
## Description of the top 5 technical challenges
* **Data Structure Design**: Data structure for the video edit package (store all the current edit action and status of different video/sound-track source) 
* **Integration**:  We need to seamlessly integrate multiple JavaScript libraries together, since there isn’t one library that can handle all our video editing needs
* **User Interface**: Since we are using JavaScript libraries for the “backend”, we would need a more complex front-end to simulate the desired video editing software.
* **Optimizing Render/Editing Performance**: Video editing takes a long time to compile normally. Depending on the JavaScript libraries that we use, our web app may have performance issues that we need to address.
* **Minimizing Response Time**: Since this is a very interactive web, we want to ensure a smooth user experience. We will need to use the idea of async and sync effectively to minimize the response time.   

