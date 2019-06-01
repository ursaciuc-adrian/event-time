import { UsersController } from '../controllers/users.controller';

import http from 'http';
import url from 'url';

export class UserRoutes {
	public usersController: UsersController = new UsersController();

	public async route(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const reqUrl = url.parse(req.url, true);

		if (reqUrl.pathname === '/events' && req.method === 'GET') {
			await this.usersController.get(req, res);
		}

		if (reqUrl.pathname === '/events' && req.method === 'POST') {
			await this.usersController.add(req, res);
		}

		if (reqUrl.pathname === '/events' && req.method === 'DELETE') {
			await this.usersController.delete(req, res);
		}

		if (reqUrl.pathname === '/events' && req.method === 'PATCH') {
			await this.usersController.update(req, res);
		}
	}
}
