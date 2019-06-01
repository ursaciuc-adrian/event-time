import http from 'http';
import url from 'url';

import Category from '../models/category.model';

import { BaseController } from './base.controller';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class CategoriesController extends BaseController {
	constructor() {
		super(Category);
	}

	public async getEventbrite(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				const request = require('request');
				request({
					uri: 'https://www.eventbriteapi.com/v3/categories/',
					headers: { 'Authorization': 'Bearer ANYLLDVFBO24ROUAOV5G' },
					method: 'GET'
				}, (error, resp, body) => {
					let theBody = JSON.parse(body);
					let categories = theBody.categories;
					let realCategories = [];

					categories.forEach(category => {
						realCategories.push(category);
					});

					console.log(realCategories);

					realCategories.forEach(realCategory => {
						let newObj = new Category({
							name: realCategory.short_name,
							origin: 'eventbrite',
							idCategory: realCategory.id
						});
						let saveObj = newObj.save();
					});

					writer.writeJson(res, JSON.stringify(realCategories));
					resolve();
				});

			} catch (err) {
				writer.writeJson(res, err, 400);
				reject();
			}
		});
	}
}
