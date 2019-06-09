import http from 'http';
import url from 'url';

import ChangeRequest from '../models/change-request.model';
import Event from '../models/event.model';

import { BaseController } from './base.controller';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class ChangeRequestsController extends BaseController {
	constructor() {
		super(ChangeRequest);
	}

	public async getUnchecked(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const obj = await ChangeRequest.find({ checked: false });

			writer.writeSuccess(res, obj);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async acceptChangeRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			if (await this.Schema.findOne({ _id: queryData.id, checked: false })) {
				// mark change request as checked
				const updated = await this.Schema.update({ _id: queryData.id }, { $set: { checked: true } });
				// get the change request document
				const changeReq = await this.Schema.findOne({ _id: queryData.id });

				// for every field change it 
				if (changeReq.title != null) {
					try {
						await Event.update({ _id: changeReq.idEvent }, { $set: { title: changeReq.title } });
					} catch (err) {
						writer.writeError(res, err, 400);
					}
				}

				if (changeReq.description != null) {
					try {
						await Event.update({ _id: changeReq.idEvent }, { $set: { description: changeReq.description } });
					} catch (err) {
						writer.writeError(res, err, 400);
					}
				}

				if (changeReq.location != null) {
					try {
						await Event.update({ _id: changeReq.idEvent }, { $set: { location: changeReq.location } });
					} catch (err) {
						writer.writeError(res, err, 400);
					}
				}

				if (changeReq.seats != null) {
					try {
						await Event.update({ _id: changeReq.idEvent }, { $set: { seats: changeReq.seats } });
					} catch (err) {
						writer.writeError(res, err, 400);
					}
				}

				if (changeReq.date != null) {
					try {
						await Event.update({ _id: changeReq.idEvent }, { $set: { date: changeReq.date } });
					} catch (err) {
						writer.writeError(res, err, 400);
					}
				}

				try {
					let updatedEvent = await Event.find({ _id: changeReq.idEvent });
					console.log(updatedEvent);
					writer.writeSuccess(res, updatedEvent);
				} catch (err) {
					writer.writeError(res, err, 400);
				}
			}

		} catch (err) {
			writer.writeError(res, err, 400);
		}

	}

}
