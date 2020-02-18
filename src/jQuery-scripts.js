$(document).ready( () => {
const eventRecommender = new EventRecommender();
    eventRecommender.addUser("Lisa", 12345);
    eventRecommender.addUser("Kim", 12346);
    eventRecommender.addUser("Bob", 12347);
    eventRecommender.addEvent("Dumpling Down – Lunar New Year Food Festival", new Date(2020, 01, 03), "Food and Drink", "The Biggest Lunar New Year Food Festival in San Francisco!", 11111);
    eventRecommender.addEvent("Incredible Art Gallery Exhibit", new Date(2020, 01, 21), "Arts & Theatre", "There will be multiple exhibits of Harry Potter, Disney, Marvel, DC Comics, Star Wars, Anime and parody art on display featuring a variety of artists and available to purchase at affordable pricing.", 22222);
    eventRecommender.addEvent("Developer Week", new Date(2020, 01, 12), "Tech", "Our conferences, tracks, technical workshops and events throughout the week invite you to get lessons, best practices -- and advanced knowledge", 33333);
    eventRecommender.addEvent("2020 Levi's Presidio 10 ", new Date(2020, 03, 19), "Sports", "A fun, family-oriented race in the Presidio of San Francisco.", 44444);
    eventRecommender.saveUserEvent(12346, 22222)
    eventRecommender.saveUserEvent(12346, 11111)
    eventRecommender.saveUserEvent(12345, 11111)

    const eventRecommenderUsers = [];
    for (let user of eventRecommender.users) {
        eventRecommenderUsers.push(user);
    }
    const eventRecommenderEvents = [];
    for (let event of eventRecommender.events) {
        eventRecommenderEvents.push(event);
    }

    function displayUsers() {
        let displayUserText = '';
        for (let user of eventRecommender.users) {
            displayUserText += `<li>${user.userName}, ID: ${user.userID}</li>`;
        }
        $("#all-users").html(displayUserText);
    }
    
    displayUsers();
    
    
    $("#add-user").submit(() => {
        let name = $("#add-user-name").val();
        let id = parseInt($("#add-user-id").val()); 

        eventRecommender.addUser(name, id);
        
        displayUsers()
    })
    
    $("#delete-user").submit(() => {
        let id = parseInt($("#delete-user-id").val());
        eventRecommender.deleteUser(id);
        displayUsers();
    })
    

   function displayEvents() {
       let displayEventText = '';
       for (let event of eventRecommender.events) { 
           displayEventText += `<li>${event.eventID} - <em>${event.eventName}</em> - ${event.getFormattedDate()} - ${event.category} - ${event.description}</li>`;
       }
       $("#all-events").html(displayEventText);
    }

    displayEvents();

    $("#add-event").submit(() => {
        let id = parseInt($("#add-event-id").val());
        let name = $("#add-event-name").val();
        let date = $("#add-event-date").val();
        let category = $("#add-event-category").val();
        let description = $("#add-event-description").val();
        
        eventRecommender.addEvent(name, date, category, description, id);
        displayEvents()
    })

    $("#delete-event").submit(() => {
        let id = parseInt($("#delete-event-id").val());
        eventRecommender.deleteEvent(id);
        displayEvents();
    })

    
    // JQUERY FOR HANDLING TICKETMASTER SECTION
    // take keyword input (validate?)
    // use that keyword in TM API call ($.ajax? .get()?)
    // using the data that was returned (first 10 events?)
        // display error message if nothing found
    // display those results below dynamically with buttons
    // add event to EventRecommender if clicked button
    // display event
    
    $("#event-search").submit( (e) => {
        event.preventDefault();
        
        let keyword = $("#tm-event-keyword").val();
        let category = $("#tm-event-category").val();
        
        // fetch syntax
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        // fetches event in the US by keyword and displays one event (size = 1). Converts to json and extract event array. Get name, date, category, and location (since there is no description). 
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&size=1&keyword=${keyword}&segmentName=${category}`, requestOptions)
        .then(response => response.json())
        .then(result => result._embedded.events)
        .then(events => {
            let message = ''
            for (let event of events) {
                let TMeventName = event.name;
                let TMeventDate = event.dates.start.localDate;
                let TMeventCategory = event.classifications["0"].segment.name;
                let TMeventLocation = event._embedded.venues["0"].name;

                let results = `<li class="TM-event-search-result">${TMeventName} - ${moment(TMeventDate).format('MMM Do YYYY')} - ${TMeventCategory} - ${TMeventLocation}</li>`
            
                message += results;

                eventRecommender.addEvent(TMeventName, TMeventDate, TMeventCategory, TMeventLocation);
            }
            $("#event-search-result").html(message)

            // add a save all button below if it's not already there (ie. no children in div)
            if (document.getElementById("btn").children.length === 0) {
                let newButton = document.createElement("BUTTON");
                newButton.innerHTML = "Save Event"
                document.getElementById("btn").appendChild(newButton);
            }
            document.getElementById("btn").addEventListener("click", () => {
                displayEvents()
            })
        })
        .catch(error => {
            console.log('error', error);
            $("#event-search-result").html("No events found")
        });
    })
    

    $("#date-search").submit(() => {
        let year = parseInt($("#date-search-year").val());
        let month = parseInt($("#date-search-month").val());
        let day = parseInt($("#date-search-day").val());
         
        let result = [];

        for (let event of eventRecommender.events) {
            if ((Number.isNaN(year) || year === event.date.getFullYear()) &&
            (Number.isNaN(month) || month === event.date.getMonth() + 1) &&
            (Number.isNaN(day) || day === event.date.getDate())) {
                result.push(event);
            }
        }
        let message = '';

        for (let element of result) {
            message += `<li>${element.eventName}</li>`;
        }

        if (message === '') {
            $("#date-search-result").html("No events found")
        } else {
            $("#date-search-result").html(message);    
        }
    })

    $("#category-search").submit(() => { 
        let category = $("#category-search-id").val();
        let filteredEvents = eventRecommender.findEventsByCategory(category); 
        if (filteredEvents.length === 0) {
            $("#category-search-result").html("No events found");
        } else {
            let categoryMessage = '';
            for (let event of filteredEvents) {
                categoryMessage += `<li>${event.eventName} - ${event.category}</li>`;
            }
            $("#category-search-result").html(categoryMessage);
        }
    })


    function displayBookmarkedEvents() {
        let displayBookmarkedEventsText = '';
        
        for (let userid in eventRecommender.bookmarkedEvents) { 
            // start string with user's name (ID -> name)
            let userString = `${eventRecommender.getUserByID( parseInt(userid) ).userName}: `;

            let userSavedEvents = eventRecommender.bookmarkedEvents[userid]; 
            
            // getting event names for events in userSavedEvents
            for (let [i, eventid] of userSavedEvents.entries()) {
                let nameOfEvent = eventRecommender.getEventByID(eventid).eventName;
    
                // format string different if at the last element of array
                (userSavedEvents.length - 1 === i) ? userString += `${nameOfEvent}` : userString += `${nameOfEvent}, `
            }
            //USE THIS FOR HTML
            displayBookmarkedEventsText += `<li>${userString}</li>`
    
            // displayBookmarkedEventsText += `${userString}\n`
        }
        
        $("#saved-events-users").html(displayBookmarkedEventsText);
     }
 
     displayBookmarkedEvents();

    $("#save-user-event").submit( () => {
        let userid = parseInt($("#save-user-id").val());
        let eventid = parseInt($("#save-event-id").val());
        // updates eventRecommender 
        eventRecommender.saveUserEvent(userid, eventid);

        displayBookmarkedEvents()
    })    
})