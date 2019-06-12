window.onload = function () {
    let eventId = sessionStorage.getItem('event-id');

    URL = "http://localhost:3000/getevent?id=";
    URL += eventId;
    fetch(URL, {
        method: "GET",
    })
        .then(resp => resp.json())
        .then(myJson => {
            console.log(myJson);
            let title = document.getElementsByClassName('eventtitle');
            title[0].innerHTML = myJson.data.title;

            let description = document.getElementsByClassName('eventdescription');
            let rawDescription = myJson.data.description.substring(0, 700);
            rawDescription += " ...";
            description[0].innerHTML = rawDescription;
            
            let date = document.getElementsByClassName('eventdate');
            date[0].innerHTML = "Event date: " + myJson.data.date;

            let location = document.getElementsByClassName('eventlocation');
            location[0].innerHTML = "Location: " + myJson.data.location;

            let seats = document.getElementsByClassName('eventseats');
            seats[0].innerHTML = "Number of seats: " + myJson.data.seats;
        })
        .catch(err => {
            console.log("Event details error!");
        });
}