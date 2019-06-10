import http from 'http';
import mongoose from 'mongoose';

import { CategoryRoutes } from './routes/category.routes';
import { ChangeRequestRoutes } from './routes/change-request.routes';
import { EventRoutes } from './routes/event.routes';
import { UserRoutes } from './routes/user.routes';
import { FollowerRoutes } from './routes/follower.routes';

import * as fetcher from './services/events-fetcher.service';

import * as writer from './utils/writer.util';

class App {
	public app: http.RequestListener;

	private readonly MONGO_URL: string = 'mongodb://localhost:27017/eventtime';

	private categoryRoutes: CategoryRoutes = new CategoryRoutes();
	private followerRoutes: FollowerRoutes = new FollowerRoutes();
	private eventRoutes: EventRoutes = new EventRoutes();
	private userRoutes: UserRoutes = new UserRoutes();
	private changeRequestRoutes: ChangeRequestRoutes = new ChangeRequestRoutes();

	constructor() {
		this.app = this.getApp();

		this.config();
		this.schedule();
	}

	private schedule(): void {
		setInterval(() => {
			fetcher.fetchEvents();
		}, 24 * 60 * 60 * 1000);
	}

	private getApp(): http.RequestListener {
		return async (req, res) => {
			const headers = {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
				'Access-Control-Max-Age': 2592000, // 30 days
				'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
			};

			if (req.method === 'OPTIONS') {
				res.writeHead(204, headers);
				res.end();
			}
			res.writeHead(200, headers);

			await this.eventRoutes.route(req, res);
			await this.userRoutes.route(req, res);
			await this.followerRoutes.route(req, res);
			await this.categoryRoutes.route(req, res);
			await this.changeRequestRoutes.route(req, res);

			writer.writeError(res, { message: 'The requested route was not found.' }, 404);
		};
	}

	private config(): void {
		this.mongoSetup();
	}

	private mongoSetup(): void {
		mongoose.Promise = global.Promise;
		mongoose.connect(this.MONGO_URL, {
			useCreateIndex: true,
			useNewUrlParser: true
		});
	}
}

export default new App().app;
