# BNMO (Backend Side)
BNMO is a Web Application which has bank integration features such as transfer and request money. Not only customer, BNMO is also used by Bank's Admin in order to monitor all transaction by customer. 

## Build By
- Primanda Adyatma Hafiz (13520022)

## How To Run
#### CLI
1. Clone this repository
2. Install npm
3. Run ```npm install``` command inside repository folder
4. Server is started on http://localhost:8081/

#### Run on Docker
1. Clone this repository
2. Run ```docker-compose build``` command inside repository folder
3. Server is started on docker image

#### Deployed server
You can request the api on https://api-bnmo.herokuapp.com/

## Design Pattern
1. Design Pattern Composite </br>
Composite pattern is used when an object is consisted of some simpler object and that simpler object is consisted of way simpler object and so on. In this case, I use this pattern to represent Customer object because it consists of multiple transactions that it already did
2. Design Pattern Builder </br>
Builder pattern is used when building complex object using simpler object and using step by step approach. In this case, I use this pattern when building Customer objects by adding request and transfer transactions to them.

## Technologies Used
- google-cloud storage (v6.2.3)
- bcrypt (v5.0.1)
- express (v4.18.1)
- express-session (v1.17.3)
- node-schedule (v2.1.0)
- nodemon (v2.0.19)
- pg (v8.7.3)
- sequelize (v6.2.13)

## How To Use
You can run the server on local with CLI or access deployed server on https://api-bnmo.herokuapp.com/. Firstly, to make request on the api you can register your account and then login.
