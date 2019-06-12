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
	fetch(`http://localhost:3000/events/filtered?pageNo=${CURRENT_PAGE}&&size=${SIZE}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + sessionStorage.getItem('token')
		},
	})
		.then((resp) => resp.json())
		.then(function (resp) {
			let parent = document.getElementsByClassName("events-list");

			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
				"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			resp.data.forEach(element => {
				let raw = document.createElement("div");
				raw.className = "event";

				let rawDate = element.date;
				let rawMonth = rawDate.substring(5, 7);
				let value = parseInt(rawMonth, 10);

				let rawDay = rawDate.substring(8, 10);
				rawDay = parseInt(rawDay, 10);

				let hour = rawDate.substring(11, 16);

				let rawTitle = element.title;
				if (rawTitle.length > 40) {
					rawTitle = rawTitle.substring(0, 40);
					rawTitle = rawTitle + " ...";
				}

				let rawDescription = element.description;
				if (rawDescription.length > 300) {
					rawDescription = rawDescription.substring(0, 300);
					rawDescription = rawDescription + " ...";
				}

				let coverPhoto = element.coverPhoto;
				if (!coverPhoto) {
					coverPhoto = "/images/no-image-found.jpg";
				}

				var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

				let event = `
				<div class="date">
					<p class="month">${months[value - 1]}</p>
					<p class="day">${rawDay}</p>
				</div>
				<img src="${coverPhoto}" alt="placeholder" />
				<div class="details">
					<div class="title">
						${rawTitle}
					</div>
					<p class="location">${element.location}</p>
					<p class="time">${hour}</p>
					<p class="description">
						${rawDescription}
					</p>
					<div class="spacer"></div>
					<div class="tags">
						<div class="tag">${element.idCategory.name}</div>
					</div>
					<a href="../request.html" class="goto"><i class="fas fa-exchange-alt"></i></a>
				</div>
			`;

				raw.innerHTML = event;
				parent[0].appendChild(raw);

				let spacer = document.createElement("div");
				spacer.className = "bottom-spacer";
				parent[0].appendChild(spacer);

				setupPagination();

			});
		})
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