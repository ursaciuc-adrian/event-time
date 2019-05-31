import { EventsController } from './controllers/events.controller.';

import http from 'http';
import mongoose from 'mongoose';
import url from 'url';

class App {
	public eventsController: EventsController = new EventsController();

	private readonly MONGO_URL: string = 'mongodb://localhost:27017/eventtime';

	constructor() {
		this.config();
	}

	public getApp(): http.RequestListener {
		// TODO: add routing
		return (req, res) => {
			const reqUrl = url.parse(req.url, true);

			if (reqUrl.pathname === '/events' && req.method === 'GET') {
				this.eventsController.getEvents(req, res);
			}
		};
	}

	private config(): void {
		this.mongoSetup();
	}

	private mongoSetup(): void {
		mongoose.Promise = global.Promise;
		mongoose.connect(this.MONGO_URL, {useNewUrlParser: true});
	}
}

export default new App().getApp();
