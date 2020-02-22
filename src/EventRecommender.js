if (!moment) {
    var moment = require('moment');
    // import moment from 'moment';
    moment().format();   
}

class EventRecommender {
    constructor() {
    // All main properties should go here.
        this.events = [];
        this.users = [];
        this.bookmarkedEvents = {}
    }

    addEvent({eventID, eventDate, eventName, eventCategory, eventLocation}) {
    // Adds a new Event to the System
        for(let event of this.events) {
            if(event.eventID === eventID) {
                return "This event already exists";
            }
        }
        this.events.push(new Event(eventID, eventDate, eventName, eventCategory, eventLocation));
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
    // initialize new Set if user never saved an event
    // add eventID to the Set for the user
    saveUserEvent(userID, eventID){
        // checks if user and event exists already
        let user = this.getUserByID(userID); // user object
        let event = this.getEventByID(eventID); // event object
        // console.log(this);
        
        // console.log('user is ', user, 'event is ', event)
        // if (!user || !event) {
        //     return "Please make sure both the user and event exists on our platform"
        // }
        
        if (!this.bookmarkedEvents[user.getUserID()]) {
            this.bookmarkedEvents[user.getUserID()] = new Set();
        }
        this.bookmarkedEvents[user.getUserID()].add(eventID);
    }

    // returns user object
    getUserByID(userID) {
        return this.users.filter(user => user.userID === userID)[0];
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
        console.log(userID);
        console.log(this.users);
        this.users = this.users.filter(user => user.userID !== userID);
        console.log(this.users);
        // CHECK BOOKMARKED EVENT AND DELETE THAT RECORD
    }
   
    deleteEvent(eventID) {
    // Deletes the Event from the system by the name of the event
        this.events = this.events.filter(event => event.eventID !== eventID);
         
        // CHECK BOOKMARKED EVENTS AND DELETE THAT EVENT FOR ALL USERS
        // return this.users;
    }

    // findEventsByDate(dateObject){
    // // Returns all events on a given date in this.events
    //     let eventsOnGivenDate = [];
    //     // iterate over this.events and check the date
    //     for (let event of this.events) {
    //         let eventDate = event.date;
    //         if (dateObject.getTime() === eventDate.getTime()) {
    //             eventsOnGivenDate.push(event);
    //         }
    //     }
    //     return eventsOnGivenDate;
    // }

    // return array of events that match 
    findEventsByDate({year, month, day}){
        const result = [];
        for (let event of eventRecommender.events) {
            if ((Number.isNaN(year) || year === event.eventDate.year &&
            (Number.isNaN(month) || month === event.eventDate.month) &&
            (Number.isNaN(day) || day === event.eventDate.day))) {
                result.push(event);
            }
        }
        return result;
    }
    
    findEventsByCategory(eventCategory){
    // Returns all events in a given category
        return this.events.filter(event => {
            return event.eventCategory.toLowerCase() === eventCategory.toLowerCase();
        });
    }
}

class Event {
    constructor(eventID, eventDate, eventName, eventCategory, eventLocation) {
        this.eventID = eventID || Math.floor(Math.random() * 100000);
        this.eventDate = eventDate; // expect date string object in input {yyyy, mm, dd}
        this.eventName = eventName;
        this.eventCategory = eventCategory;
        this.eventLocation = eventLocation;
    }

    // 2/19 updated to accept object of strings
    getFormattedDate() {
        let dateString = `${this.eventDate.year},${this.eventDate.month},${this.eventDate.day}`;
        // console.log('formated date is: ', dateString);
        // console.log(new Date(dateString));
        return moment(new Date(dateString)).format('MMM Do YYYY');
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

    // const eventRecommender = new EventRecommender();
        // eventRecommender.addUser("Lisa", 12345);
        // eventRecommender.addUser("Kim", 12346);
    //     eventRecommender.addUser("Bob", 12347);
        // eventRecommender.addEvent({'eventName': "Event1", 'eventDate': {'year': 2020, 'month': 01, 'day': 03}, 'eventCategory': "Food and Drink", 'eventLocation': "sf", 'eventID': 11111});
    //     eventRecommender.addEvent({'eventName': "event2", 'eventDate': {'year': 2021, 'month': 04, 'day': 03}, 'eventCategory': "sports", 'eventLocation': "sf", 'eventID': 22222});
    //     // eventRecommender.addEvent("Incredible Art Gallery Exhibit", new Date(2020, 01, 21), "Arts & Theatre", "sf", 22222);
    //     eventRecommender.saveUserEvent(12346, 22222)
    //     eventRecommender.saveUserEvent(12346, 11111)
        // eventRecommender.saveUserEvent(12345, 11111)
// console.log(eventRecommender);
// let dateString = eventRecommender.events[0].eventDate;
// console.log(new Date(dateString.year, dateString.month, dateString.day));
// console.log(eventRecommender.events[0] instanceof Event)
// console.log(eventRecommender.events[0].getFormattedDate())
// console.log(eventRecommender.findEventsByCategory('sports'));
// console.log(eventRecommender.findEventsByDate({'year': 2021, 'month': 04, 'day': 03}));
// console.log(eventRecommender.getUserByID(12346));
// console.log(eventRecommender);


if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}

// export {EventRecommender, User, Event}  