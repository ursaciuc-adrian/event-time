import http from 'http';
import url from 'url';

import Category from '../models/category.model';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class CategoriesController {
	public async add(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const newObj = new Category(await reader.readJson(req));
			const saveObj = await newObj.save();

			writer.writeJson(res, saveObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async get(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const obj = await Category.find({});

			writer.writeJson(res, obj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
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

	public async delete(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const deleteObj = await Category.remove({ _id: queryData.id });

			writer.writeJson(res, deleteObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async update(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const newObj = new Category(await reader.readJson(req));
			const updateObj = await Category.update({ _id: queryData.id }, newObj);

			writer.writeJson(res, updateObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}
}
