import http from 'http';
import url from 'url';

import User from '../models/user.model';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class UsersController {
	public async add(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const newObj = new User(await reader.readJson(req));
			const saveObj = await newObj.save();

			writer.writeJson(res, saveObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async get(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const obj = await User.find({});

			writer.writeJson(res, obj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async delete(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const deleteObj = await User.remove({ _id: queryData.id });

			writer.writeJson(res, deleteObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async update(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const newObj = new User(await reader.readJson(req));
			const updateObj = await User.update({ _id: queryData.id }, newObj);

			writer.writeJson(res, updateObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}
}
