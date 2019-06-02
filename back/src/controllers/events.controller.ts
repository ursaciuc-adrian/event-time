import http from 'http';
import url from 'url';

import Event from '../models/event.model';

import { BaseController } from './base.controller';

import * as auth from '../services/auth.service';
import * as emailSender from '../services/email-sender.service';
import * as eventsFetcher from '../services/events-fetcher.service';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class EventsController extends BaseController {
	constructor() {
		super(Event);
	}

	public async getEventbriteEvents(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		// TODO: fix Unhandled promise rejection.
		try {
			await eventsFetcher.getEventbriteEvents();

			writer.writeSuccessMessage(res, 'The events were fetched.');
		} catch (err) {
			writer.writeJson(res, err, 400);
		}


		// return new Promise((resolve, reject) => {
			// const queryData = url.parse(req.url, true).query;
			// let addedEvents = [];
			// try {
			// 	const request = require('request');
			// 	request({
			// 		uri: 'https://www.eventbriteapi.com/v3/events/search/?categories=' + queryData.id,
			// 		headers: { 'Authorization': 'Bearer ANYLLDVFBO24ROUAOV5G' },
			// 		method: 'GET'
			// 	}, (error, resp, body) => {
			// 		let theBody = JSON.parse(body);
			// 		let events = theBody.events;
			// 		let realEvents = [];

			// 		events.forEach(category => {
			// 			realEvents.push(category);
			// 		});

			// 		realEvents.forEach(realEvent => {
			// 			Event.count({ title: realEvent.name.text }, (err, count) => {
			// 				if (count === 0) {
			// 					let newObj = new Event({
			// 						title: realEvent.name.text,
			// 						description: realEvent.description.text,
			// 						location: '-',
			// 						seats: realEvent.capacity != null ? realEvent.capacity : 0,
			// 						coverPhoto: realEvent.logo != null ? JSON.stringify(realEvent.logo.url) : 'null',
			// 						date: realEvent.start.local,
			// 						category: realEvent.category_id // de modificat ca sa aiba referinta la un obiect de tipul categorie
			// 					});
			// 					addedEvents.push(realEvent);

			// 					let saveObj = newObj.save();
			// 				}
			// 			})
			// 		});

			// 		writer.writeJson(res, JSON.stringify(addedEvents));
			// 		resolve();
			// 	});

			// } catch (err) {
			// 	writer.writeJson(res, err, 400);
			// 	reject();
			// }

		// });
	}

	public async sendMail(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		if (await auth.isInRole(req.headers.authorization, 'Admin')) {
			emailSender.sendEmail('ursaciuc.adrian27@gmail.com', 'da', 'heeey');

			writer.writeJson(res, { status: 'ok' });
		}

		writer.writeJson(res, { error: 'You don\'t have the right to be here.' });
	}
}
