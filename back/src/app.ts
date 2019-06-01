import http from 'http';
import mongoose from 'mongoose';
import { EventRoutes } from './routes/event.routes';
import { UserRoutes } from './routes/user.routes';

class App {
	public app: http.RequestListener;

	private readonly MONGO_URL: string = 'mongodb://localhost:27017/eventtime';

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
