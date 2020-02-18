# Team Pepega - Project Proposal
## Project Title  
* Magic Video
## Team Members  
* Botao Martin Liang  
* Harrison Fok  
* Qi Lin  
## Description of the web application  
* This web application is used for in-browser video editing
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
* Data structure design for the video edit package (store all the current editing and status of different source)  
* We need to seamlessly integrate multiple JavaScript libraries together, since there isn’t one library that can handle all our video editing needs  
* Since we are using JavaScript libraries for the “backend”, we would need a more complex front-end to reach the desired complexity of the web app  
* Video editing takes a long time to compile normally. Depending on the JavaScript libraries that we use, our web app may have performance issues that we need to address.  
* There are a lot of small features we need to add in terms of video editing, but due to having to test and integrate all of them we may have to scrap some features in our final implementation  

