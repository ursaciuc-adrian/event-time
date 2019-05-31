import http from 'http';

import Event from '../models/event.model';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export async function addEvent(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
	try {
		const newObj = new Event(await reader.readJson(req));
		const saveObj = await newObj.save();

		writer.writeJson(res, saveObj);
	} catch (err) {
		writer.writeJson(res, err, 400);
	}
}
