import { CategoriesController } from '../controllers/categories.controller';

import http from 'http';
import url from 'url';

export class CategoryRoutes {
	public categoriesController: CategoriesController = new CategoriesController();

	public async route(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const reqUrl = url.parse(req.url, true);

		if (reqUrl.pathname === '/categories' && req.method === 'GET') {
			await this.categoriesController.get(req, res);
		}

		if (reqUrl.pathname === '/categories' && req.method === 'POST') {
			await this.categoriesController.add(req, res);
		}

		if (reqUrl.pathname === '/categories' && req.method === 'DELETE') {
			await this.categoriesController.delete(req, res);
		}

		if (reqUrl.pathname === '/categories' && req.method === 'PATCH') {
			await this.categoriesController.update(req, res);
		}
	}
}
