fetch('http://localhost:3000/events/random?nr=5', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then((resp) => resp.json())
	.then(function (resp) {
		let parent = document.getElementsByClassName("container");

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
				<img src="${coverPhoto}" alt="placeholder" />
				<div class="details">
					<div class="title">
						${rawTitle}
					</div>
					<p class="location">${element.location}</p>
					<p class="time">${new Date(element.date).toLocaleString("en-US", options)}</p>
					<p class="description">
						${rawDescription}
					</p>
					<div class="spacer"></div>
					<div class="tags">
						<div class="tag">${element.category}</div>
					</div>
					<a href="../request.html" class="goto"><i class="fas fa-exchange-alt"></i></a>
				</div>
			`;

			raw.innerHTML = event;
			parent[0].appendChild(raw);

			let spacer = document.createElement("div");
			spacer.className = "bottom-spacer";
			parent[0].appendChild(spacer);
		});
	})