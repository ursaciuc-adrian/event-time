document.querySelector("#subscribe-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var checkedBoxes = document.querySelectorAll('input[name=category]:checked');
    console.log(checkedBoxes);

    checkedBoxes.forEach(element => {
        fetch("http://localhost:3000/auth/me", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(resp => resp.json())
            .then(myJson2 => {
                if (myJson2) {
                    fetch("http://localhost:3000/users/add-subscription?id=" + myJson2.data.id + '&category=' + element.id, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (myJson) {
                            window.location.href = "index.html";
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    window.location.href = "index.html";
                }
            })
            .catch(err => {
                console.log(err);
            })
    });







});