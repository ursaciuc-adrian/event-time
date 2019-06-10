import http from 'http';
import url from 'url';
import request from 'async-request';

import Event from '../models/event.model';
import Category from '../models/category.model';

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

	public async notifications(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		// TODO: fix Unhandled promise rejection.
		try {
			await eventsFetcher.fetchEvents();

			writer.writeSuccess(res, {});
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async getEventbriteEvents(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		// TODO: fix Unhandled promise rejection.
		try {
			await eventsFetcher.getEventbriteEvents();

			writer.writeSuccess(res, {});
		} catch (err) {
			console.log(err);
			writer.writeError(res, err, 400);
		}
	}

	public async getMeetupEvents(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		// TODO: fix Unhandled promise rejection.
		try {
			await eventsFetcher.getMeetupEvents();

			writer.writeSuccess(res, {});
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async sendMail(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		if (await auth.isInRole(req.headers.authorization, 'Admin')) {
			emailSender.sendEmail('ursaciuc.adrian27@gmail.com', 'da', 'heeey');

			writer.writeSuccess(res, {});
		}

		writer.writeError(res, { message: 'You don\'t have the right to be here.' }, 401);
	}

	public async getNEvents(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const result = await Event.aggregate([{ $sample: { size: parseInt(queryData.nr[0], 10) } }]);
			for (const event of result) {
				event.category = (await Category.findById({ _id: event.idCategory })).name;
			}

			writer.writeSuccess(res, result);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async getEventsByOrganization(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const categories = await Category.find({ originName: 'Meetup' });
			let events = [];

			const response = await request(
				'https://api.meetup.com/find/groups?&sign=true&photo-host=public&key=352395f2f577c7216632a056757444', {
					method: 'GET'
				});

			const body = JSON.parse(response.body);

			for (const group of body) {
				console.log(group.urlname);
				if (queryData.name === group.organizer.name) {
					const response2 = await request(
						'https://api.meetup.com/' + group.urlname + '/events?&sign=true&photo-host=public&key=352395f2f577c7216632a056757444', {
							method: 'GET'
						});

					const body2 = JSON.parse(response2.body);

					for (const element of body2) {
						let event = {
							idOrigin: element.id,
							originName: 'Meetup',
							title: element.name != null ? element.name : '',
							description: element.description != null ? element.description : '',
							location: element.group.localized_location !== null && typeof element.group.localized_location !== 'undefined' ? element.group.localized_location : '',
							seats: element.yes_rsvp_count != null ? element.yes_rsvp_count : 0,
							coverPhoto: element.photo_url != null ? element.photo_url : '',
							date: element.time != null ? element.time : ''
						};
						events.push(event);
					}
					break;
				}
			}

			const data = {
				events: events
			};

			writer.writeSuccess(res, data);
		} catch (err) {
			throw err;
		}
	}
}