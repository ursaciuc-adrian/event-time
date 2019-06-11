window.onload = function () {
    if (sessionStorage.getItem('token') != 'null') {
        fetch("http://localhost:3000/auth/me", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(myJson => {
                if (myJson.status == "success") {
                    let loginBtn = document.getElementById("loginBtn");

                    loginBtn.innerText = "Logout";
                    loginBtn.setAttribute('href', 'index.html');
                    loginBtn.setAttribute('onClick', 'logoutFunction()');
                }
            })
            .catch(err => {
                console.log("You aren't logged in.");
            });
    }
};

function logoutFunction() {
    sessionStorage.setItem('token', 'null');
}