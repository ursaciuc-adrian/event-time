import http from 'http';
import mongoose from 'mongoose';

import { CategoryRoutes } from './routes/category.routes';
import { EventRoutes } from './routes/event.routes';
import { UserRoutes } from './routes/user.routes';

import * as writer from './utils/writer.util';

class App {
	public app: http.RequestListener;

	private readonly MONGO_URL: string = 'mongodb://localhost:27017/eventtime';

	private categoryRoutes: CategoryRoutes = new CategoryRoutes();
	private eventRoutes: EventRoutes = new EventRoutes();
	private userRoutes: UserRoutes = new UserRoutes();

	constructor() {
		this.app = this.getApp();

		this.config();
	}

	private getApp(): http.RequestListener {
		return async (req, res) => {
			await this.eventRoutes.route(req, res);
			await this.userRoutes.route(req, res);
			await this.categoryRoutes.route(req, res);

			writer.writeJson(res, { error: 'The requested route was not found.' }, 404);
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
