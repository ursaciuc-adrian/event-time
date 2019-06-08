fetch('http://localhost:3000/events/random?nr=5', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((resp) => resp.json())
    .then(function (resp) {
        console.log(resp)
        let parent = document.getElementsByClassName("container");

        var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        resp.data.forEach(element => {
            let raw = document.createElement("div");
            raw.className = "event";

            let event = `<div class='date'>
            <p class='month'>`;

            let rawDate = element.date;
            console.log(rawDate);
            let rawMonth = rawDate.substring(5,7);
            let value = parseInt(rawMonth, 10);

            event += months[value - 1];

            event += `</p>
            <p class='day'>`;

            let rawDay = rawDate.substring(8,10);
            rawDay = parseInt(rawDay, 10);
            
            event += rawDay;

            event += `</p>
            </div>
            <img src='`;

            event += element.coverPhoto;

            event += `' alt='placeholder' />
            <div class='details'>
                <div class='title'>
                    `;
            
            event += element.title;

            event += `
            </div>
            <p class='location'>`;

            event += element.location;

            event += `</p>
            <p class='time'>`;

            let hour = rawDate.substring(11,16);

            event += hour;

            event += `</p>
            <p class='description'>
                `;

            let rawDescription = element.description;
            if(rawDescription.length > 300) {
                rawDescription = rawDescription.substring(0, 300);
                rawDescription = rawDescription + " ...";
            }
            event += rawDescription;

            event += `
            </p>
            <div class='spacer'></div>
            <div class='tags'>
                <div class='tag'>`

            event += "CEVA";
                
            event += `</div>
            </div>
            <a href='../request.html' class='goto'>Request change <i class='fas fa-long-arrow-alt-right'></i> </a>
        </div>
        
        </div>`;


            raw.innerHTML = event;
            console.log(event);
            parent[0].appendChild(raw);

            let spacer = document.createElement("div");
            spacer.className = "bottom-spacer";
            parent[0].appendChild(spacer);
        });
    })