import http from 'http';
import url from 'url';

import { Schema } from 'mongoose';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class BaseController {
	public readonly Schema: Schema;
	public readonly Authorization: any;

	constructor(schema: Schema) {
		this.Schema = schema;
	}

	public async add(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const newObj = new this.Schema(await reader.readJson(req));
			const saveObj = await newObj.save();

			writer.writeSuccess(res, saveObj);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async getTotalPages(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			let size = +queryData.size;
			if (size === null || size === undefined || size < 1 || isNaN(size)) {
				size = 1;
			}

			const result = +(await this.Schema.countDocuments({}));
			writer.writeSuccess(res, Math.ceil((result / size)));
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async get(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const pageNo = +queryData.pageNo;
			const size = +queryData.size;
			let query = {};
			if (pageNo && size) {
				query = {
					skip: size * (pageNo - 1),
					limit: size
				};
			}

			const result = await this.Schema.find({}, {}, query);
			writer.writeSuccess(res, result);

		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async delete(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const deleteObj = await this.Schema.remove({ _id: queryData.id });

			writer.writeSuccess(res, deleteObj);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async update(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const newObj = new this.Schema(await reader.readJson(req));
			const updateObj = await this.Schema.update({ _id: queryData.id }, newObj);

			writer.writeSuccess(res, updateObj);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}
}