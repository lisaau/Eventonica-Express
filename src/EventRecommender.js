if (!moment) {
    var moment = require('moment');
    moment().format();   
}

class EventRecommender {
    constructor() {
    // All main properties should go here.
        this.events = [];
        this.users = [];
        this.bookmarkedEvents = {}
    }

    addEvent(eventID, eventName, date, category, description) {
    // Adds a new Event to the System
        this.events.push(new Event(eventID, eventName, date, category, description));
    }

    addUser(userName, userID) {
    // Adds a new User to the System if the user doesn't exist already
        for(let user of this.users) {
            if(user.userID === userID) {
                return "This user already exists";
            }
        }
        this.users.push(new User(userName, userID));
    }

    // expects numbers for the ID's
    saveUserEvent(userid, eventid){
        // checks if user and event exists already
        let user = this.getUserByID(userid);
        let event = this.getEventByID(eventid);
        if (!user || !event) {
            return "Please make sure both the user and event exists on our platform"
        }

        if (!this.bookmarkedEvents[user.getUserID()]) {
            this.bookmarkedEvents[user.getUserID()] = [];
        }
        this.bookmarkedEvents[user.getUserID()].push(eventid);
    }

    // returns user object
    getUserByID(userid) {
        return this.users.filter(user => user.userID === userid)[0];
    }
    
    // returns event object
    getEventByID(eventid) {
        return this.events.filter(event => event.eventID === eventid)[0];
    }

    getBookmarkedEventsByUser(userid) {
        return this.bookmarkedEvents[userid] || [];
    }

    deleteUser(userID) {
    // Deletes a User from the system based on userID
        this.users = this.users.filter(user => user.userID !== userID);
    }
   
    deleteEvent(eventID) {
    // Deletes the Event from the system by the name of the event
        this.events = this.events.filter(event => event.eventID !== eventID);
        // return this.users;
    }

    findEventsByDate(dateObject){
    // Returns all events on a given date in this.events
        let eventsOnGivenDate = [];
        // iterate over this.events and check the date
        for (let event of this.events) {
            let eventDate = event.date;
            if (dateObject.getTime() === eventDate.getTime()) {
                eventsOnGivenDate.push(event);
            }
        }

        return eventsOnGivenDate;
    }
    
    findEventsByCategory(category){
    // Returns all events in a given category
        return this.events.filter(event => {
            return event.category.toLowerCase() === category.toLowerCase();
        });
    }
}

class Event {
    constructor(eventName, date, category, description, eventID) {
        this.eventID = eventID || Math.floor(Math.random() * 100000);
        this.date = date; // expect date object in input
        this.eventName = eventName;
        this.category = category;
        this.description = description || '';
    }

    getFormattedDate() {
        return moment(this.date).format('MMM Do YYYY');
    }
}

class User {
    constructor(userName, userID) {
        this.userName = userName;
        this.userID = userID || Math.floor(Math.random() * 100000);
    }
    
    getUserID() {
        return this.userID;
    }
}

if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}
