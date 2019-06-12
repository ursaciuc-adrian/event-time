document.querySelector("#login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("http://localhost:3000/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: document.getElementById('signup-first-name').value + " " + document.getElementById('signup-last-name').value,
                email: document.getElementById('signup-email').value,
                password: document.getElementById('signup-confirm-password').value,
                role: "User"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if (myJson.status == "fail") {
                console.log('FAIL');
            } else {
                fetch("http://localhost:3000/auth/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: document.getElementById('signup-email').value,
                            password: document.getElementById('signup-confirm-password').value
                        }),
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
                        alert(err);
                    });
                window.location.href = "login.html";
            }
        })
        .catch(err => {
            console.log(err);
        });
});