document.querySelector("#subscribe-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var checkedBoxes = document.querySelectorAll('input[name=category]:checked');

    checkedBoxes.forEach(element => {
        fetch("http://localhost:3000/auth/me", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(resp => resp.json())
            .then(myJson2 => {
                if (typeof myJson2.data.id !== 'undefined') {
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

let categoriesContainer = document.getElementById("categories");

fetch("http://localhost:3000/auth/me", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(myJson2 => {
        if (typeof myJson2.data.id !== 'undefined') {
            fetch("http://localhost:3000/categories/unsubscribed?id=" + myJson2.data.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let categories = myJson.data.categories;
                    let i = 0;
                    categories.forEach(category => {
                        let div = document.createElement("div");
                        let input = document.createElement("input");
                        input.type = "checkbox";
                        input.id = category._id;
                        input.name = "category";

                        let label = document.createElement("label");
                        label.htmlFor = category._id;

                        let img = document.createElement("img");
                        img.src = "images/mountains.jpeg";
                        img.alt = " ";

                        let span = document.createElement("span");
                        span.innerText = category.name;

                        label.appendChild(img);
                        label.appendChild(span);
                        div.appendChild(input);
                        div.appendChild(label);

                        categoriesContainer.appendChild(div);

                        i++;
                    });
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