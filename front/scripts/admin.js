fetch('http://localhost:3000/auth/me', {
	method: 'GET',
	headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
	},
})
	.then((resp) => resp.json())
	.then(function (resp) {
        if (resp.status == "fail") {
            window.location.href = "../index.html";
        } else {
            if (resp.data.role != "Admin") {
                window.location.href = "../index.html";
            } else {
                let adminName = resp.data.name;
                document.getElementsByClassName("name")[0].innerHTML = adminName;
            }
        }
    });