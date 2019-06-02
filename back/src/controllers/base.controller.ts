import http from 'http';
import url from 'url';

import { Schema } from 'mongoose';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class BaseController {
	public readonly Schema: Schema;

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

	public async get(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const obj = await this.Schema.find({});

			writer.writeSuccess(res, obj);
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