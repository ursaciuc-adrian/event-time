if (sessionStorage.getItem('token') !== null || sessionStorage.getItem('token') === 'null') {
    fetch("http://localhost:3000/auth/me", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(resp => resp.json())
        .then(myJson => {
            if (typeof myJson.data.id === 'undefined') {
                window.location.href = "index.html";
            }
        })
        .catch(err => {
            console.log("You aren't logged in.");
            window.location.href = "index.html";
        });
} else {
    window.location.href = "index.html";
}