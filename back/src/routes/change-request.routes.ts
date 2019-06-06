import { ChangeRequestsController } from '../controllers/change-requests.controller';

import http from 'http';
import url from 'url';

export class ChangeRequestRoutes {
	public changeRequestsController: ChangeRequestsController = new ChangeRequestsController();

	public async route(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const reqUrl = url.parse(req.url, true);

		if (reqUrl.pathname === '/change-requests' && req.method === 'GET') {
			await this.changeRequestsController.get(req, res);
		}

		if (reqUrl.pathname === '/change-requests' && req.method === 'POST') {
			await this.changeRequestsController.add(req, res);
		}

		if (reqUrl.pathname === '/change-requests' && req.method === 'DELETE') {
			await this.changeRequestsController.delete(req, res);
		}

		if (reqUrl.pathname === '/change-requests' && req.method === 'PATCH') {
			await this.changeRequestsController.update(req, res);
		}

		if (reqUrl.pathname === '/change-requests/accept' && req.method === 'GET') {
			await this.changeRequestsController.acceptChangeRequest(req, res);
		}
	}
}
