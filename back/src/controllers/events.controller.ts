import http from 'http';
import url from 'url';
import request from 'async-request';

import Event, { IEvent } from '../models/event.model';
import Category from '../models/category.model';

import { BaseController } from './base.controller';

import * as auth from '../services/auth.service';
import * as emailSender from '../services/email-sender.service';
import * as eventsFetcher from '../services/events-fetcher.service';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

import { EventbriteEventsFetcher } from '../services/events-fetcher/eventbrite.events-fetcher';
import { MeetupEventsFetcher } from '../services/events-fetcher/meetup.events-fetcher';

export class EventsController extends BaseController {
	public eventbriteEventsFetcher: EventbriteEventsFetcher;
	public meetupEventsFetcher: MeetupEventsFetcher;

	constructor() {
		super(Event);

		this.eventbriteEventsFetcher = new EventbriteEventsFetcher();
		this.meetupEventsFetcher = new MeetupEventsFetcher();
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

	public async getEventbriteEventsByOrganization(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const id = queryData.id.toString();
			const events: IEvent[] = await this.eventbriteEventsFetcher.getEventsByOrganizer(id);

			writer.writeSuccess(res, events);
		} catch (err) {
			throw err;
		}
	}

	public async getMeetupEventsByOrganization(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const id = queryData.id.toString();
			const events: IEvent[] = await this.meetupEventsFetcher.getEventsByOrganizer(id);

			writer.writeSuccess(res, events);
		} catch (err) {
			throw err;
		}
	}
}
