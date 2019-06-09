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
                window.location.href = "index.html";
            }
            else {
                document.getElementById("error").innerText = myJson.data.message;
            }
        })
        .catch(err => {
            alert(err);
        });
});