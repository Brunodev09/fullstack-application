# fullstack-application

> A fully functional template of a fullstack application using Microservices architecture, MVC pattern and latest ES6 syntax.

> The project was done as a challenge in around a week time, with an average work of 2h/day.

> node.js react.js mongodb docker jest fullstack microservices mvc

**Build status**

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger)


***Graphics***

> Interface-01
[![GRAPHIC1](https://i.imgur.com/J2iv1zo.png)]()
[![GRAPHIC2](https://i.imgur.com/qxXoEOv.png)]()


> Interface-02
[![GRAPHIC4](https://i.imgur.com/j1v44JM.png)]()


> Interface-03
[![GRAPHIC5](https://i.imgur.com/QTwRb7m.png)]()


## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [License](#license)


## Installation

### Clone

- Clone this repository to your local machine using the following link `https://github.com/Brunodev09/fullstack-application`

### Setup and Execution

> You need the current LTS version of docker and docker-compose to run theses services 
 (When this was created: docker v18.09.7 and docker-compose v1.21.0).

```shell
$ sudo docker-compose up
```

- After the images are done downloading, extracting and installing the necessary dependencies, docker will automatically execute 
 4 services in 4 different components:

- A submit service, backend, with the port of 5001.
- An admin service, backend, with the port of 5000.
- A interface service, frontend, with the port of 3000.
- A local MongoDB database with the default port of 27017. 



 You can interact with the frontend interfaces by going to the link `http://localhost:3000`.



 If you want to mess around with the database, you can have access to the Docker's Virtual Machine by simply using:

```shell
$ sudo docker ps
```
 This will bring all the containers running. Get the ID from the container named: "mongo:latest", and then proceed:

```shell
$ sudo docker exec -it <containerId> /bin/bash
```
 Now you are already inside the Virtual Machine, and can enter the standard MongoDB commands to explore the database.

```shell
root@<containerId>:/# mongo
root@<containerId>:/# show dbs
root@<containerId>:/# use <dbName>
root@<containerId>:/# show collections
root@<containerId>:/# db.<collection>.<action>({<queryObject>})
```

 You can interact with the backend and frontend themselves with the same sequence of commands though I DON'T recommend you to.

> You can shut down theses services by using:
```shell
$ sudo docker-compose down
```

> And delete the images with:
```shell
$ sudo docker images
$ sudo docker rmi <imageId>
```
---

## Features
> Interface to trigger a process to add a user and 5 favorite songs and persist it on your local database.

> Interface to consume a process that calculates the top5 rated songs from your local database and the contribution points from each user.

> Interface that lists helpful links.

## Technology

> Docker
- Two extremely scalable backend services sharing one MongoDB database.
- One container encapsulating a React application that consumes both services routes.
- Start all of them with the magic word of docker-compose. 

> Backend
- Complete and extremely scalable Node.js backed (Controllers are VERY easily added, scaled and separated due to the MVC pattern used).
- Routes protected against basic DDoS attacks. (Attacks coming from the IP address, of course. Sistemic attacks are untreated).
- Clusterized Express ports to deliver highly available routes.
- REST architecture very easily handled by Controller classes.

> Frontend
- Reusable custom components from MaterialUI: lists, tables, virtualized tables, menus, forms and loaders.
- A very light and abstracted Http class.
- React router and history for easy navigation.

## Documentation
> The code was documented using JSDoc standards and you can find the complete documentation .html in the `./out` folder of every service. 

## Tests
- The tests were written with the help of JEST for classes and logic flow and supertest to test and simulate route requests.
- Unfortunately I had no time to test-code the frontend service as time was already short.


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
