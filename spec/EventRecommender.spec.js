const { EventRecommender, User, Event } = require('../src/EventRecommender.js'); // Update with your class names and file name
let er; 

describe("EventRecommender", () => {
  
    beforeEach(() => {
      er = new EventRecommender();
      er.addEvent({eventID: 11111, eventDate: new Date(2020, 01, 03), eventName: "Event 1", eventCategory: "Concert",  eventLocation: "San Francisco"});
      er.addEvent({eventID: 22222, eventDate: new Date(2020, 02, 03), eventName: "Event 2", eventCategory: "Sport",  eventLocation: "New York"});
    });
  
    describe("addEvent", () => {
      it("adds a new Event to the system", () => {
        er.addEvent({eventName: "New Event's Name"});
        expect(er.events.length).toEqual(3);
        expect(er.events[er.events.length - 1].eventName).toEqual("New Event's Name"); 
      });
    });
  
    describe("addUser", () => {
      it("adds a new User to the system", () => {
        er.addUser("User's Name", 12345);
        expect(er.users.length).toEqual(1);
      });
    });
  
    describe("getUserByID", () => {
      it("returns an array with a user given an ID", () => {
        er.addUser("User's Name", 12345);
        expect(typeof er.getUserByID(12345)).toEqual("object");
        expect(er.getUserByID(12345).userID).toEqual(12345);
        expect(er.getUserByID("notaRealID")).toEqual(undefined)
      })
    })

    describe("deleteUser", () => {
      it("removes a User from the system", () => {
        er.addUser("User's Name", 12345);
        er.deleteUser(12345);
      });
    });
  
    describe("deleteEvent", () => {
      it("removes the event from the system", () => {
        er.addEvent({eventID: 33333, eventDate: new Date(2020, 03, 03), eventName: "Event 3", eventCategory: "Sport",  eventLocation: "New York"});
        er.deleteEvent(33333);
        expect(er.events.length).toEqual(2);
      });
    });


    describe("findEventsByCategory", () => {
      it("returns array of events with the specified category", () => {
        // check that the result is an array
        expect(Array.isArray(er.findEventsByCategory("Concert"))).toBe(true);

        // has the correct length
        expect(er.findEventsByCategory("Concert").length).toEqual(1);

        // check that each event in the resulting array is of the specified category
        for (let event of er.findEventsByCategory("Concert")) {
          expect(event.eventCategory).toEqual("Concert");
        }
      });
    });
});