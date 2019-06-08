document.querySelector("#login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if(myJson.status == "success") {
                window.location.href = "http://localhost:5500/index.html";
            }
            else {
                document.getElementById("wrong-user-pass").style.display = "block";
            }
        })
        .catch(err => {
            alert(err);
        });
});