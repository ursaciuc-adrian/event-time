import http from 'http';
import url from 'url';

import Category from '../models/category.model';

import { BaseController } from './base.controller';

import request from 'async-request';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class CategoriesController extends BaseController {
	constructor() {
		super(Category);
	}

	public async getEventbriteCategories(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const response = await request(
				'https://www.eventbriteapi.com/v3/categories/',
				{
					method: 'GET',
					headers: { Authorization: 'Bearer ANYLLDVFBO24ROUAOV5G' }
				});

			const body = JSON.parse(response.body);

			for (const element of body.categories) {
				const count = await Category.count({ idOrigin: element.id, originName: 'eventbrite' });
				if (count === 0) {
					const obj = new Category({
						name: element.short_name,
						idOrigin: element.id,
						originName: 'eventbrite'
					});

					await obj.save();
				}
			}

			writer.writeSuccess(res, {});
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async getMeetupCategories(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const response = await request(
				'https://api.meetup.com/2/categories?&sign=true&photo-host=public&key=352395f2f577c7216632a056757444',
				{
					method: 'GET'
				});

			const body = JSON.parse(response.body);

			body.results.forEach(async (element) => {
				const count = await Category.count({ idOrigin: element.id, originName: 'meetup' });
				if (count === 0) {
					const obj = new Category({
						name: element.shortname,
						idOrigin: element.id,
						originName: 'meetup'
					});

					await obj.save();
				}
			});

			writer.writeSuccess(res, {});
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async getNameById(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;
		try {
			const category = await Category.findOne({ _id: queryData.id });

			let data = {
				name: category.name
			};

			writer.writeSuccess(res, data);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

}
