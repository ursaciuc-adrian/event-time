import { FollowersController } from '../controllers/followers.controller';

import http from 'http';
import url from 'url';

export class FollowerRoutes {
	public followerController: FollowersController = new FollowersController();

	public async route(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const reqUrl = url.parse(req.url, true);

		if (reqUrl.pathname === '/followers' && req.method === 'GET') {
			await this.followerController.get(req, res);
		}

		if (reqUrl.pathname === '/followers' && req.method === 'POST') {
			await this.followerController.add(req, res);
		}

		if (reqUrl.pathname === '/followers' && req.method === 'DELETE') {
			await this.followerController.delete(req, res);
		}

		if (reqUrl.pathname === '/followers' && req.method === 'PATCH') {
			await this.followerController.update(req, res);
		}

		if (reqUrl.pathname === '/followers/from-url' && req.method === 'GET') {
			await this.followerController.addFollwerFromUrl(req, res);
		}
	}
}
