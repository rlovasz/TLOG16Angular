# Timelogger (Frontend - Angular2)

----
## Requirements

* docker 
* docker-compose
* npm 4.0.5 version
* nodejs v7.4.0 version
* typescript 2.1.5 version

----


### How to use the code

* git clone https://github.com/rlovasz/TLOG16RS.git
* git clone https://github.com/rlovasz/TLOG16Angular.git
* in the TLOG16RS directory: gradle dBI
* in the TLOG16Angular directory: npm install
* build the frontend with the following: npm run build
* docker build --no-cache -t trainingproject/tlog16angular .
* create and start the containers: docker-compose up -d
* now you can reach the result on the 8089 port

