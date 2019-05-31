import http from 'http';
import mongoose from 'mongoose';
import { EventRoutes } from './routes/event.routes';

class App {
	public eventRoutes: EventRoutes = new EventRoutes();

	public app: http.RequestListener;
	private readonly MONGO_URL: string = 'mongodb://localhost:27017/eventtime';

	constructor() {
		this.app = this.getApp();

		this.config();
	}

	public getApp(): http.RequestListener {
		return (req, res) => {
			this.eventRoutes.route(req, res);
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

export default new App().app;
