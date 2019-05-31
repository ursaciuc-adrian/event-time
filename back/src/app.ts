import * as EventController from './controllers/events.controller.';

import http from 'http';
import url from 'url';

const hostname = '127.0.0.1';
const port = 3000;

http.createServer((req, res) => {
	const reqUrl = url.parse(req.url, true);

	if (reqUrl.pathname === '/events' && req.method === 'GET') {
		EventController.getEvents(req, res);
	}
}).listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
