// [2/20 NEED TO FIX JQUERY CODE]when an event is deleted, if there is any user attending that event, then those records should be deleted as well. We call this "cascading", and I encourage you to look into it some more.avoid using arrow functions in the handlers, and that's because one of the (usually great) attribute of an arrow function is auto-binding of the "this" context, which can create problems if you never need to call $(this).
$(document).ready( () => {
    // const eventRecommender = new EventRecommender();
    //     eventRecommender.addUser("Lisa", 12345);
    //     eventRecommender.addUser("Kim", 12346);
    //     eventRecommender.addUser("Bob", 12347);
    //     eventRecommender.addEvent("Dumpling Down – Lunar New Year Food Festival", new Date(2020, 01, 03), "Food and Drink", "The Biggest Lunar New Year Food Festival in San Francisco!", 11111);
    //     eventRecommender.addEvent("Incredible Art Gallery Exhibit", new Date(2020, 01, 21), "Arts & Theatre", "There will be multiple exhibits of Harry Potter, Disney, Marvel, DC Comics, Star Wars, Anime and parody art on display featuring a variety of artists and available to purchase at affordable pricing.", 22222);
    //     eventRecommender.addEvent("Developer Week", new Date(2020, 01, 12), "Tech", "Our conferences, tracks, technical workshops and events throughout the week invite you to get lessons, best practices -- and advanced knowledge", 33333);
    //     eventRecommender.addEvent("2020 Levi's Presidio 10 ", new Date(2020, 03, 19), "Sports", "A fun, family-oriented race in the Presidio of San Francisco.", 44444);
    //     eventRecommender.saveUserEvent(12346, 22222)
    //     eventRecommender.saveUserEvent(12346, 11111)
    //     eventRecommender.saveUserEvent(12345, 11111)
    
        // const eventRecommenderUsers = [];
        // for (let user of eventRecommender.users) {
        //     eventRecommenderUsers.push(user);
        // }
        // const eventRecommenderEvents = [];
        // for (let event of eventRecommender.events) {
        //     eventRecommenderEvents.push(event);
        // }
    
        function displayUsers() {
            let request = $.ajax( {
                method: "GET",
                url: '/users', 
            });

            request.done( () => {
                let displayUserText = '';
                for (let user of request.responseJSON) {
                    
                    displayUserText += `<li>${user.userName}, ID: ${user.userID}</li>`;
                }
                $("#all-users").html(displayUserText);
            })
        }
        
        displayUsers();
        
        
        $("#add-user").submit((e) => {
            e.preventDefault();
            let name = $("#add-user-name").val();
            let id = parseInt($("#add-user-id").val());
            console.log("Add user submit name is: ", name);
            
            let request = $.ajax( {
                method: "POST",
                url: '/user', 
                data: {'userID': id, 'userName': name},
                contentType: 'application/x-www-form-urlencoded',
            });

            request.done( () => console.log("success"))
            request.fail( () => console.log("failed"))
            
            displayUsers()
        })
        
        $("#delete-user").submit((e) => {
            e.preventDefault();
            let id = parseInt($("#delete-user-id").val());

            let request = $.ajax( {
                method: "DELETE",
                url: '/user', 
                data: {'userid': id}
            });

            request.done( () => console.log("success"))
            request.fail( () => console.log("failed"))
            displayUsers();
        })
        

        // NEED TO FIX ${event.getFormattedDate()}
        function displayEvents() {
           let request = $.ajax( {
               method: "GET",
               url: '/events', 
            });

            request.done( () => {
                let displayEventText = '';
                for (let event of request.responseJSON) {
                    
                    displayEventText += `<li>${event.eventID} - <em>${event.eventName}</em> - ${event.eventCategory} - ${event.eventLocation}</li>`;
                }
                $("#all-events").html(displayEventText);
            })
        }
    
        displayEvents();
    
        $("#add-event").submit((e) => {
            e.preventDefault();
            let id = parseInt($("#add-event-id").val());
            let name = $("#add-event-name").val();
            let date = $("#add-event-date").val().split("-"); // SPLIT INTO YEAR, MONTH, DAY
            let category = $("#add-event-category").val();
            let location = $("#add-event-location").val();
            console.log(date);
            
            let request = $.ajax( {
                method: "POST",
                url: '/event', 
                data: {'eventID': id, 'eventName': name, 'eventCategory': category, 'eventLocation': location, 'eventDate': {'year': date[0], 'month': date[1], 'day': date[2]}},
                contentType: 'application/x-www-form-urlencoded',
            });

            // eventRecommender.addEvent(name, date, category, description, id);
            // displayEvents()
        })
    
    //     $("#delete-event").submit(() => {
    //         let id = parseInt($("#delete-event-id").val());
    //         eventRecommender.deleteEvent(id);
    //         displayEvents();
    //     })
    
        
        // JQUERY FOR HANDLING TICKETMASTER SECTION
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
                    let TMeventDate = event.dates.start.localDate.split("-"); //SPLIT THIS OUT INTO YEAR, MONTH, DAY
                    let TMeventCategory = event.classifications["0"].segment.name;
                    let TMeventLocation = event._embedded.venues["0"].name;
    
                    let results = `<li class="TM-event-search-result">${TMeventName} - ${moment(TMeventDate).format('MMM Do YYYY')} - ${TMeventCategory} - ${TMeventLocation}</li>`
                
                    message += results;
    

                    let request = $.ajax( {
                        method: "POST",
                        url: '/event', 
                        data: {'eventName': TMeventName, 'eventCategory': TMeventCategory, 'eventLocation': TMeventLocation, 'eventDate': {'year': TMeventDate[0],'month': TMeventDate[1], 'day': TMeventDate[2]}},
                        contentType: 'application/x-www-form-urlencoded',
                    });
                    request.done( () => {
                        console.log("added TM event");
                        
                    })
                    // eventRecommender.addEvent(TMeventName, TMeventDate, TMeventCategory, TMeventLocation);
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
        
    // NEED TO ADJUST CODE BELOW TO USE NEW findEventsByDate that accepts strings instead of date object
    //     $("#date-search").submit(() => {
    //         let year = parseInt($("#date-search-year").val());
    //         let month = parseInt($("#date-search-month").val());
    //         let day = parseInt($("#date-search-day").val());
             
    //         let result = [];
    
    //         for (let event of eventRecommender.events) {
    //             if ((Number.isNaN(year) || year === event.date.getFullYear()) &&
    //             (Number.isNaN(month) || month === event.date.getMonth() + 1) &&
    //             (Number.isNaN(day) || day === event.date.getDate())) {
    //                 result.push(event);
    //             }
    //         }
    //         let message = '';
    
    //         for (let element of result) {
    //             message += `<li>${element.eventName}</li>`;
    //         }
    
    //         if (message === '') {
    //             $("#date-search-result").html("No events found")
    //         } else {
    //             $("#date-search-result").html(message);    
    //         }
    //     })
    
        $("#category-search").submit((e) => { 
            e.preventDefault();
            let eventCategory = $("#category-search-id").val(); // category is string in lower case
            console.log('category is ',  eventCategory);
            

            let request = $.ajax( {
                method: "GET",
                url: `/events-by-category?eventCategory=${eventCategory}`, 
                // contentType: 'application/json; charset=utf-8'
                // data: form.serialize()
             });

            request.done( () => {
                if (request.responseJSON.length === 0) {
                    $("#category-search-result").html("No events found");
                } else {
                    let categoryMessage = '';
                    for (let event of request.responseJSON) {
                        categoryMessage += `<li>${event.eventName} - ${event.eventCategory}</li>`;
                    }
                    $("#category-search-result").html(categoryMessage);
                }
            })
        })
    
    
        function displayBookmarkedEvents() {
            let requestBookmarked = $.ajax( {
                method: "GET",
                url: '/bookmarked', 
            });

            requestBookmarked.done( () => {
                let displayBookmarkedEventsText = '';

                console.log(requestBookmarked.responseJSON);

                for (let userID in requestBookmarked.responseJSON) { 
                    // start string with user's name (ID -> name)
                    // let userString = `${requestUsers.responseJSON.getUserByID( parseInt(userID))}`;
                    
                    let requestUsers = $.ajax( {
                        method: "GET",
                        url: '/users', 
                    });
                    requestUsers.done ( () => {
                        let test = requestUsers.responseJSON; // array of user objects
                        
                        for (let eventID in requestBookmarked.responseJSON[userID]) {
                            let requestEvents = $.ajax( {
                                method: "GET",
                                url: '/events', 
                            });

                            requestEvents.done( () => {
                                console.log(requestEvents.responseJSON);
                                
                            })
                        }
                        
                    });
                    


                    // console.log(requestBookmarked.responseJSON[userID]); // array of event IDs
                       
                }

            })

            
    
            //     let userSavedEvents = eventRecommender.bookmarkedEvents[userid]; 
                
            //     // getting event names for events in userSavedEvents
            //     for (let [i, eventid] of userSavedEvents.entries()) {
            //         let nameOfEvent = eventRecommender.getEventByID(eventid).eventName;
        
            //         // format string different if at the last element of array
            //         (userSavedEvents.length - 1 === i) ? userString += `${nameOfEvent}` : userString += `${nameOfEvent}, `
            //     }
            //     //USE THIS FOR HTML
            //     displayBookmarkedEventsText += `<li>${userString}</li>`
        
            //     // displayBookmarkedEventsText += `${userString}\n`
            // }
            
            // $("#saved-events-users").html(displayBookmarkedEventsText);
         }
     
    //      displayBookmarkedEvents();
    
        $("#save-user-event").submit( (e) => {
            e.preventDefault();
            let userID = parseInt($("#save-user-id").val());
            let eventID = parseInt($("#save-event-id").val());

            let request = $.ajax( {
                method: "PUT",
                url: `/bookmarked?userID=${userID}&eventID=${eventID}`, 
            });
             
            displayBookmarkedEvents()
        })    
})