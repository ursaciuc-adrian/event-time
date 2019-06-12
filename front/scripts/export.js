let exportBtn = document.getElementById("exportBtn");
var content = "";

fetch("http://localhost:3000/auth/me", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(myJson2 => {
        if (typeof myJson2.data.id !== 'undefined') {
            fetch("http://localhost:3000/events/me?id=" + myJson2.data.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    content = myJson.data.iCalendarString;
                })
                .catch(err => {
                    alert("Seems like there's a problem and you can't do that.")
                    console.log(err);
                });
        }
    })
    .catch(err => {
        console.log(err);
    });

exportBtn.addEventListener('click', () => {
    function calendarContent() {
        return content;
    }

    function downloadFile(name, contents, mime_type) {
        mime_type = mime_type || "text/plain";

        let blob = new Blob([contents], {
            type: mime_type
        });

        let dlink = document.createElement('a');
        dlink.download = name;
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function (e) {
            let that = this;
            setTimeout(function () {
                window.URL.revokeObjectURL(that.href);
            }, 1500);
        };

        dlink.click();
        dlink.remove();
    }

    downloadFile("calendar.ics", calendarContent());
})