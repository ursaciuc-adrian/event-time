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

		if (reqUrl.pathname === '/events/pages' && req.method === 'GET') {
			await this.eventsController.getTotalPages(req, res);
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

		if (reqUrl.pathname === '/events/fetch' && req.method === 'GET') {
			await this.eventsController.fetchNewEvents(req, res);
		}

		if (reqUrl.pathname === '/events/notify' && req.method === 'GET') {
			await this.eventsController.notify(req, res);
		}

		if (reqUrl.pathname === '/events/eventbrite' && req.method === 'GET') {
			await this.eventsController.getEventbriteEvents(req, res);
		}

		if (reqUrl.pathname === '/events/meetup' && req.method === 'GET') {
			await this.eventsController.getMeetupEvents(req, res);
		}

		if (reqUrl.pathname === '/events/random' && req.method === 'GET') {
			await this.eventsController.getNEvents(req, res);
		}

		if (reqUrl.pathname === '/events/eventbrite/organizer' && req.method === 'GET') {
			await this.eventsController.getEventbriteEventsByOrganization(req, res);
		}

		if (reqUrl.pathname === '/events/meetup/organizer' && req.method === 'GET') {
			await this.eventsController.getMeetupEventsByOrganization(req, res);
		}
	}
}
