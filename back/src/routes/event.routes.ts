import { EventsController } from '../controllers/events.controller';

import http from 'http';
import url from 'url';

export class EventRoutes {
	public eventsController: EventsController = new EventsController();

	public async route(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const reqUrl = url.parse(req.url, true);

		if (reqUrl.pathname === '/events' && req.method === 'GET') {
			await this.eventsController.get(req, res);
		}

		if (reqUrl.pathname === '/events' && req.method === 'POST') {
			await this.eventsController.add(req, res);
		}

		if (reqUrl.pathname === '/events' && req.method === 'DELETE') {
			await this.eventsController.delete(req, res);
		}

		if (reqUrl.pathname === '/events' && req.method === 'PATCH') {
			await this.eventsController.update(req, res);
		}

		if (reqUrl.pathname === '/email' && req.method === 'GET') {
			await this.eventsController.sendMail(req, res);
		}
	}
}
