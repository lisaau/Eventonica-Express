const express = require('express');
// import express from 'express';
const { EventRecommender, User,  Event}  = require('./src/EventRecommender');
// import { EventRecommender, User,  Event} from './src/EventRecommender';
const er = new EventRecommender();

const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
// const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// NOTES/Q's:
// do I need a template engine for single page app? what if I already have an html file? can I just serve that or do I have to convert with template engine? probably better since I have custom error page; but in total it's only 2 pages
    // https://stackoverflow.com/questions/14681276/how-to-make-an-express-site-without-a-template-engine
// url with a /#add-event- can I change to /add-event? Will I need to modify my HTML (ie. action='#add-event')
// how do I create REST API? do I add this within index.js?
// GET /events HTTP/1.1
// Host: http://127.0.0.1:3000/
// Content-Type: application/json

// making AJAX calls
// $("button").click(function(){
    // $.ajax({url: "demo_test.txt", success: function(result){
    //     $("#div1").html(result);
    //   }});

// json file with temp data? what does it mean to store data in express server? cookies and sessions? 

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
    
// displaying all users
app.get('/users', (req, res) => {
    res.json(er.users); // is an array
})

// adding one user
app.post('/user', (req, res) => {
    const username = req.body.username;
    const userid = req.body.userid;
    console.log("Body of request is: ", req.body)
    // Output the user to the console for debugging
    console.log("req.body.username/user is: ", username);
    er.addUser(username, userid)

    res.status(200).send('User is added to the "database"');
});

// deleting one user (DOES NOT WORK)
app.delete('/user/:userid', (req, res) => {
    const user = parseInt(req.params.userid);
    console.log(req.params);
    
    if(er.users.includes(er.getUserByID(user))) {
        er.deleteUser(user);
        res.status(200).send('User is deleted from the "database"');
    } else {
        res.status(400).send('User was not found');
    }
})

// display all events
app.get('/events', (req, res) => {
    res.json(er.events)
})

// adding one event (DOES NOT WORK, name, date and description is missing)
app.post('/event', (req, res) => {
    const {eventID, eventDate, eventName, eventCategory, eventLocation} = req.body;
    console.log("Body of request is: ", req.body)
    er.addEvent(eventID, eventDate, eventName, eventCategory, eventLocation)

    res.send('Event is added to the "database"');
});

app.get('/test', (req, res) => {
    res.send(er); 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})