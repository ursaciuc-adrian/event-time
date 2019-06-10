fetch('http://localhost:3000/auth/me', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then((resp) => resp.json())
	.then(function (resp) {
        console.log(resp);

        if (resp.status == "fail") {
            window.location.href = "../index.html";
        } else {
            if (resp.role != "admin") {
                window.location.href = "../index.html";
            } else {
                let adminName = resp.name;
                document.getElementsByClassName("name").innerHTML = adminName;
            }
        }
    });