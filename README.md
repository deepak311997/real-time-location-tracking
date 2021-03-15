# calender-my-tasks

Problem statement:
    Using MQTT create React app which subscribes to a topic and plots route and a nodejs server which publishes the coordinates

![Real time location tracking](demo/real-time-location.gif)

Pre-requisites:
  ReactJS
  NodeJs

Development:
    1) Clone this repository
    2) Run npm install
    3) Open a command prompt and run 'npm run start:client'
    4) Open another command prompt and run 'npm run start:service'
    5) Frontend will run on port 8080 and backend will run on port 9090
    6) Hit http://localhost:8080/

Production:
    1) Run 'npm run build'
    2) Redirect to build/server and run 'node server.js'
    3) Hit http://localhost:9090/