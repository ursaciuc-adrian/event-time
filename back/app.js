const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

http.createServer((req, res) => {
	const reqUrl = url.parse(req.url, true);

	if (reqUrl.pathname == '/events' && req.method === 'GET') {
		var eventsController = require('./controllers/EventController.js');
		eventsController.getEvents(req, res);
	}
})
.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});;