import http from 'http';
import url from 'url';

import Event from '../models/event.model';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class EventsController {
	public async add(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const newObj = new Event(await reader.readJson(req));
			const saveObj = await newObj.save();

			writer.writeJson(res, saveObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async get(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const obj = await Event.find({});

			writer.writeJson(res, obj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async delete(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const deleteObj = await Event.remove({ _id: queryData.id });

			writer.writeJson(res, deleteObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async update(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const newObj = new Event(await reader.readJson(req));
			const updateObj = await Event.update({ _id: queryData.id }, newObj);

			writer.writeJson(res, updateObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}
}
