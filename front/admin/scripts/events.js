let CURRENT_PAGE = 1;
let SIZE = 10;
let ADJACENTS = 3;
let TOTAL_PAGES = 0;

(function () {
	fetchEvents();
})();

function setupPagination() {
	fetch(`http://localhost:3000/events/pages?size=${SIZE}`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp => resp.json())
		.then(myJson => {
			TOTAL_PAGES = +myJson.data;
			setPagination();
		})
		.catch(err => {
			alert("An error occurred!");
		});
}

function prevPage() {
	if (CURRENT_PAGE > 1) {
		CURRENT_PAGE--;
		fetchEvents();
	}
}

function nextPage() {
	if (CURRENT_PAGE < TOTAL_PAGES) {
		CURRENT_PAGE++;
		fetchEvents();
	}
}

function getPageLink(i, page) {
	let li = document.createElement('li');
	let a = document.createElement('a');

	a.classList.add('pagination-link');
	a.innerText = i;
	a.onclick = function () {
		CURRENT_PAGE = i;
		fetchEvents();
	};

	if (i === page) {
		a.classList.add("active");
	}

	li.appendChild(a);
	return li;
}

function getPageEllipsis() {
	let li = document.createElement('li');
	li.innerHTML = `<span class="pagination-ellipsis">&hellip;</span>`;

	return li;
}

function setPagination() {
	let list = document.getElementById('pagination-list');
	list.innerHTML = '';

	if (TOTAL_PAGES < 7 + (ADJACENTS * 2)) {
		for (let i = 1; i <= TOTAL_PAGES; i++) {
			list.appendChild(getPageLink(i, CURRENT_PAGE));
		}
	} else if (TOTAL_PAGES > 5 + (ADJACENTS * 2)) {
		if (CURRENT_PAGE < 1 + (ADJACENTS * 2)) {
			for (let i = 1; i < 4 + (ADJACENTS * 2); i++) {
				list.appendChild(getPageLink(i, CURRENT_PAGE));
			}

			list.appendChild(getPageEllipsis());
			list.appendChild(getPageLink(TOTAL_PAGES - 2, CURRENT_PAGE));
			list.appendChild(getPageLink(TOTAL_PAGES - 1, CURRENT_PAGE));
			list.appendChild(getPageLink(TOTAL_PAGES, CURRENT_PAGE));
		} else if (TOTAL_PAGES - (ADJACENTS * 2) > CURRENT_PAGE && CURRENT_PAGE > (ADJACENTS * 2)) {
			list.appendChild(getPageLink(1, CURRENT_PAGE));
			list.appendChild(getPageLink(2, CURRENT_PAGE));
			list.appendChild(getPageLink(3, CURRENT_PAGE));
			list.appendChild(getPageEllipsis());

			for (let i = CURRENT_PAGE - ADJACENTS; i <= CURRENT_PAGE + ADJACENTS; i++) {
				list.appendChild(getPageLink(i, CURRENT_PAGE));
			}

			list.appendChild(getPageEllipsis());
			list.appendChild(getPageLink(TOTAL_PAGES - 2, CURRENT_PAGE));
			list.appendChild(getPageLink(TOTAL_PAGES - 1, CURRENT_PAGE));
			list.appendChild(getPageLink(TOTAL_PAGES, CURRENT_PAGE));
		} else {
			list.appendChild(getPageLink(1, CURRENT_PAGE));
			list.appendChild(getPageLink(2, CURRENT_PAGE));
			list.appendChild(getPageLink(3, CURRENT_PAGE));
			list.appendChild(getPageEllipsis());

			for (let i = TOTAL_PAGES - (2 + (ADJACENTS * 2)); i <= TOTAL_PAGES; i++) {
				list.appendChild(getPageLink(i, CURRENT_PAGE));
			}
		}
	}
}

function fetchEvents() {
	let tbody = document.getElementById("events-list");
	tbody.innerHTML = '';

	fetch(`http://localhost:3000/events?pageNo=${CURRENT_PAGE}&&size=${SIZE}`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(function (response) {
			return response.json();
		})
		.then(function (result) {
			let events = result.data;
			events.forEach(element => {
				let tr = document.createElement('tr');
				tr.innerHTML = `
							<tr>
								<td>${element.idOrigin}</td>
								<td>${element.title}</td>
								<td>${element.location}</td>
								<td>${new Date(element.date).toLocaleString()}</td>
								<td>
									<button class="button button-icon hover-danger" onclick="deleteEvent('${element._id}')"><i class="fas fa-trash"></i></button>
								</td>
							</tr>
						`;

				tbody.appendChild(tr);
			});

			setupPagination();
		})
		.catch(err => {
			alert('An error occurred!')
		});
}

function deleteEvent(id) {
	var r = confirm("Are you sure you want to delete this event?");
	if (r == true) {
		fetch('http://localhost:3000/events?id=' + id, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(resp => resp.json())
			.then(myJson2 => {
				fetchEvents();
			})
			.catch(err => {
				alert("An error occurred!");
			});
	}
}