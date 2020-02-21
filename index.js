const express = require('express');
// import express from 'express';
const { EventRecommender, User,  Event}  = require('./src/EventRecommender');
// import { EventRecommender, User,  Event} from './src/EventRecommender';
const er = new EventRecommender();
er.addEvent({'eventName': "event1", 'eventDate': {'year': 2020, 'month': 01, 'day': 03}, 'eventCategory': "Food and Drink", 'eventLocation': "sf", 'eventID': 11111});
er.addEvent({'eventName': "event2", 'eventDate': {'year': 2021, 'month': 04, 'day': 03}, 'eventCategory': "Sports", 'eventLocation': "sf", 'eventID': 22222});
// er.addUser({'userID': 12345, 'userName': "Lisa"});
er.addUser(12345, "Lisa");
er.addUser(12346, "Kim");

const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(morgan('tiny'));


// NOTES/Q's:
// [RESOLVED] do I need a template engine for single page app? what if I already have an html file? can I just serve that or do I have to convert with template engine? probably better since I have custom error page; but in total it's only 2 pages
    // https://stackoverflow.com/questions/14681276/how-to-make-an-express-site-without-a-template-engine
// [RESOLVED] url with a /#add-event- can I change to /add-event? Will I need to modify my HTML (ie. action='#add-event')


// making AJAX calls?
// $("button").click(function(){
    // $.ajax({url: "demo_test.txt", success: function(result){
    //     $("#div1").html(result);
    //   }});



// user management:
    // Displaying all users (get)
    // app.get('/users', (req, res) => {
    //     res.render(something from the template engine?)
    // })
    // Add user (post)
    // Delete user (delete)
// event management:
    // Displaying all events (get)
    // Add event (post)
    // Delete event (delete)
// ticket master
    // getting events from TM (get)
    // saving those events (post?)
    // displaying in all events (get)
// search and save
    // find events by date (get)
    // find events by category (get)
    // save event for user (put), displaying results (get)


// serve static files
app.use(express.static('public'))
    
// gets array of all users (each user is an object). returns an array
app.get('/users', (req, res) => {
    res.json(er.users); // is an array
})

// adds one user (key = 'username', value = name of user as a string)
// input taken from body
// userID is optional
// does not return anything
app.post('/user', (req, res) => {
    const username = req.body.username;
    const userid = parseInt(req.body.userid);
    console.log("Body of request is: ", req.body)
    // Output the user to the console for debugging
    console.log("req.body.username/user is: ", username);
    er.addUser(username, userid)

    res.status(200).send('User is added to the "database"');
});

// deletes one user by userID
// WHY PARAMS VS BODY
app.delete('/user/', (req, res) => {
    const user = parseInt(req.body.userid);
    console.log(req.params);
    
    if(er.users.includes(er.getUserByID(user))) {
        er.deleteUser(user);
        res.status(200).send('User is deleted from the "database"');
    } else {
        res.status(400).send('User was not found');
    }
})

// gets array of all event objects
app.get('/events', (req, res) => {
    res.json(er.events)
})

// adds one event, does not return anything 
// required parameter: eventDate ({'year': number, 'month': number, 'day': number}), eventName (string), eventCategory (string), eventLocation (string))
// eventID (number) is optional. will randomly assign ID if none is provided
app.post('/event', (req, res) => {
    // const {eventID, eventDate, eventName, eventCategory, eventLocation} = req.body;
    console.log("Body of request is: ", req.body)
    er.addEvent(req.body)

    res.send('Event is added to the "database"');
});

// deleted one event by eventID
// does not return anything
app.delete('/event/', (req, res) => {
    const event = parseInt(req.body.eventid);
    if (er.events.includes(er.getEventByID(event))) {
        er.deleteEvent(event);
        res.status(200).send('Event is deleted from the "database"');
    } else {
        res.status(400).send('Event was not found');
    }
})

// get array of events by date 
// inputs are from params
// returns an array
app.get('/events-by-date/', (req, res) => {
    // one option: /events-by-date/:year?/:month?/:day?
    // const {year, month, day} = req.params;
    const year = parseInt(req.query.year); //either a value or undefined
    const month = parseInt(req.query.month);
    const day = parseInt(req.query.day);
    console.log({'year': year, 'month': month, 'day': day});
    console.log(er.findEventsByDate({'year': year, 'month': month, 'day': day}))
    console.log(year, month, day)
    res.json(er.findEventsByDate({'year': year, 'month': month, 'day': day}));
})

// get array of events by category 
// inputs are from params
// returns an array
app.get('/events-by-category/', (req, res) => {
    res.json(er.findEventsByCategory(req.body.eventCategory))
})



// DOES TICKETMASTER API GO HERE? OR STAY IN JQUERY

// SAVE EVENT FOR USER
// CHANGE CODE SO THAT IF EVENT IS DELETED FROM ER, EVENT IS NO LONGER ATTACHED TO USER
// does not return anything
// accepts userID and eventID in body(?)
app.put('/bookmarked', (req, res) => {
    // let userid = parseInt($("#save-user-id").val());
    //         let eventid = parseInt($("#save-event-id").val());
    //         // updates eventRecommender 
    //         eventRecommender.saveUserEvent(userid, eventid);
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})