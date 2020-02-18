const express = require('express');
const { EventRecommender, User,  Event}  = require('./src/EventRecommender');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
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



app.get('/', (req, res) => {
    res.send('hello'); 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})