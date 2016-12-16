# Timelogger (Frontend - Angular2)

----
## Requirements

* docker 
* docker-compose
* npm 3.8.6 version
* nodejs v5.12.0 version

----


### How to use the code

* git clone https://github.com/rlovasz/TLOG16RS.git
* git clone https://github.com/rlovasz/TLOG16Angular.git
* in the TLOG16RS directory: gradle dBI
* in the TLOG16Angular directory: npm install
* build the frontend with the following: npm run build
* docker build --no-cache -t trainingproject/tlog16angular .
* create and start the database: docker-compose up -d tlog-db
* create and start the backend: docker-compose up -d tlog-backend
* create and start the frontend: docker-compose up -d tlog-angular
* now you can reach the result on the 8089 port

