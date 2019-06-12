window.onload = function () {
    if (sessionStorage.getItem('token') != 'null' && sessionStorage.getItem('token')) {
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

                    let exportBtn = document.getElementById("exportBtn");
                    exportBtn.style.display = "block";

                    let registerBtn = document.getElementById("registerBtn");
                    registerBtn.style.display = "none";

                    changeSubscribeBtn("block");

                    if (myJson.data.role == "User") {
                        changeAdminBtn("none");
                    } else {
                        changeAdminBtn("block");
                    }
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

function changeSubscribeBtn(disp) {
    let subscribeBtn = document.getElementById("subscribeBtn");
    subscribeBtn.style.display = disp;
}

function changeAdminBtn(disp) {
    let adminBtn = document.getElementById("adminBtn");
    adminBtn.style.display = disp;
}