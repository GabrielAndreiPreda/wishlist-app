

# Probabi-List-ic Purchases - the (local) MySQL wishlist

## Table of contents
- [Probabi-List-ic Purchases - the (local) MySQL wishlist](#probabi-list-ic-purchases---the-local-mysql-wishlist)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Features](#features)
  - [Tested websites](#tested-websites)
  - [To-do](#to-do)

## Overview
Probabi-List-ic Purchases facilitates the organisation of the best past-time — shopping for cheapies made out of Chineseum

## Technologies
The app is a single-page application that uses Angular for the front-end, NestJS for the back-end, and MySQL for the local database server


## Setup

To clone and run this application, you'll need Git and Node.js installed on your computer (or just download it from the repo). From the command line:

```bash
# Clone this repository
$ git clone https://github.com/GabrielAndreiPreda/wishlist-app

# Install dependencies
$ npm install
```

Npm can be used to run the application with the following command that starts both the front-end and back-end at the same time
```bash
npm start
```
For debugging the front-end and back-end can be served separately
```bash
nx wish-list:serve
nx api:serve
```

The local MySQL database has to be on the default port (3306) and the username & password have to be both '```root```' to work out of the box.

These settings can be changed in the NestJS ```app.module``` file (```wishlist-app\apps\api\src\app.module.ts```)

A starter database export can be found in the ```Optional Setup``` folder with a pre-made user (```username:test & pass:123```). Alternatively you may create a ```'wishlist'``` schema and the tables will be created automatically on start-up

## Features
- Multiple users
- Hashed passwords & secure login
- Backend routes guarded with JWT (stored in cookies)
- Backup/share wishlist data
- Dark mode
- Semi-responsive layout
- Supports pretty much any website that has some sort of tags for their products

## Tested websites
- AliExpress
- eBay
- eMag
- BioSano
- Etsy
- Auchan
- Amazon

## To-do

- Snackbar message display for errors
- Search bar
- ~~Add users~~ 
- Make wishlist sharing between users
- ~~Download/Upload backup~~ 
- Make sorting by store functional