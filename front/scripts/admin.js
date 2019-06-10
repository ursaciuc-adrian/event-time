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
            if (resp.data.role != "admin") {
                window.location.href = "../index.html";
            } else {
                let adminName = resp.data.name;
                document.getElementsByClassName("name").innerHTML = adminName;
            }
        }
    });