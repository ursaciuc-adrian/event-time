import { UsersController } from '../controllers/users.controller';

import http from 'http';
import url from 'url';

export class UserRoutes {
	public usersController: UsersController = new UsersController();

	public async route(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const reqUrl = url.parse(req.url, true);

		if (reqUrl.pathname === '/users' && req.method === 'GET') {
			await this.usersController.get(req, res);
		}

		if (reqUrl.pathname === '/users' && req.method === 'POST') {
			await this.usersController.add(req, res);
		}

		if (reqUrl.pathname === '/users' && req.method === 'DELETE') {
			await this.usersController.delete(req, res);
		}

		if (reqUrl.pathname === '/users' && req.method === 'PATCH') {
			await this.usersController.update(req, res);
		}

		if (reqUrl.pathname === '/auth/register' && req.method === 'POST') {
			await this.usersController.register(req, res);
		}

		if (reqUrl.pathname === '/auth/login' && req.method === 'POST') {
			await this.usersController.login(req, res);
		}

		if (reqUrl.pathname === '/auth/me' && req.method === 'GET') {
			await this.usersController.me(req, res);
		}

		if (reqUrl.pathname === '/users/add-subscription' && req.method === 'GET') {
			await this.usersController.addSubscription(req, res);
		}

		if (reqUrl.pathname === '/users/remove-subscription' && req.method === 'GET') {
			await this.usersController.removeSubscription(req, res);
		}
	}
}
