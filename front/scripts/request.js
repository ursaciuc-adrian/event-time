document.querySelector("#login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let location = document.getElementById('location').value;
    let seats = document.getElementById('seats').value;
    let date = document.getElementById('date').value;

    let data = {};
    // hardcoded
    // TO DO: get the idEvent from that event and put it in here
    Object.assign(data, {
        idEvent: "5cf8d4f7fe06d4335085c06d"
    });

    if (title.trim() !== "" && title.trim() !== null) {
        Object.assign(data, {
            title: title.trim()
        });
    }

    if (description.trim() !== "" && description.trim() !== null) {
        Object.assign(data, {
            description: description.trim()
        });
    }

    if (location.trim() !== "" && location.trim() !== null) {
        Object.assign(data, {
            location: location.trim()
        });
    }

    if (seats !== "" && seats !== null) {
        Object.assign(data, {
            seats: seats
        });
    }

    if (date !== "" && date !== null) {
        Object.assign(data, {
            date: date
        });
    }

    fetch("http://localhost:3000/change-requests", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
        })
        .catch(err => {
            console.log(err);
        });
});