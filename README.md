# Eventonica with Express Backend

Eventonica is a web app to manage events from [Techtonica's curriculum](https://github.com/Techtonica/curriculum/tree/master/projects/eventonica). This repo includes part 5 listed in the [Overview](#overview).



## Overview

The project is split into seven phases covering various topics, some of which are in a different GitHub repo.

| Project Outline                                              | Project Repo                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Part 1 - Object-Oriented Programming](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part1-objects.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 2 - Testing](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part2-testing.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 3 - jQuery UI](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part3-jquery-ui.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 4 - API's](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part4-apis.md) | [Eventonica-API](https://github.com/lisaau/Eventonica-API)   |
| [Part 5 - Express Backend](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part5-express-backend.md) | [Eventonica-With-Express](https://github.com/lisaau/Eventonica-Express) |
| [Part 6 - Postgres Database](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part6-postgres.md) | [Eventonica-Postgres](https://github.com/lisaau/Eventonica-Postgres) |
| [Part 7 - React Frontend](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part7-react.md) | [Eventonica-React](https://github.com/lisaau/Eventonica-React) |



### Part 5

The project builds on part 1-4. In addition to an **object-oriented-programming** approach to set up the functionality, **jasmine** for unit testing, and **jQuery** for the UI, utilizing **Ticketmaster's API** to add additional events, this part of the project focuses on the the **Express server**.



## Running the app

To run locally,

1. Clone this repo by running

```bash
git clone https://github.com/lisaau/Eventonica-Express.git
cd Eventonica-Express
```

2. Then install dependencies and start the app

```bash
npm install
```

3. To view the app, run `node index.js` or `nodemon` and view the app on `http://localhost:3000/`
4. Type `jasmine` to run the unit tests or mocha to run the integration tests in the terminal. Make sure to start up the server before running the tests.