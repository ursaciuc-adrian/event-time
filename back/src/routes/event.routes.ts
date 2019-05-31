import { EventsController } from '../controllers/events.controller.';

import http from 'http';
import url from 'url';

export class EventRoutes {
	public eventsController: EventsController = new EventsController();

	public route(req: http.IncomingMessage, res: http.ServerResponse): void {
		const reqUrl = url.parse(req.url, true);

		if (reqUrl.pathname === '/events' && req.method === 'GET') {
			this.eventsController.getEvents(req, res);
		}
	}
}