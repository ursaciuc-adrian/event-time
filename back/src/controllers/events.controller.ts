import http from 'http';
import url from 'url';
import ICAL from 'ical.js';
import request from 'async-request';

import Event, { IEvent } from '../models/event.model';
import Category from '../models/category.model';
import User from '../models/user.model';

import { BaseController } from './base.controller';
import { CategoriesController } from './categories.controller';

import * as auth from '../services/auth.service';
import * as emailSender from '../services/email-sender.service';
import * as eventsFetcher from '../services/events-fetcher.service';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';
import { write } from 'fs';

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

	public async getEventsFiltered(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
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

			let result = [];
			if (await auth.isLoggedIn(req.headers.authorization)) {
				const user = await auth.getUser(req.headers.authorization);

				result = await Event.find({ idCategory: { $in: user.subscriptions } }, {}, query).populate('idCategory');
			} else {
				result = await Event.find({}, {}, query).populate('idCategory');
			}

			writer.writeSuccess(res, result);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async fetchNewEvents(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const result = await eventsFetcher.checkForEvents();

			writer.writeSuccess(res, result);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async notify(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const result = await eventsFetcher.checkForNotifications();

			writer.writeSuccess(res, { emailsSent: result });
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

	public async getMyEvents(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const queryData = url.parse(req.url, true).query;
			const user = await User.findOne({ _id: queryData.id });

			let subscriptions = user.subscriptions;
			let allEvents = [];

			for (const element of subscriptions) {
				let events = await Event.find({ idCategory: element });

				events.forEach(event => {
					allEvents.push(event);
				});
			}

			let iCalendarData = [
				'BEGIN:VCALENDAR',
				'VERSION:2.0',
				'PRODID:-//ZContent.net//Zap Calendar 1.0//EN',
				'CALSCALE:GREGORIAN',
				'METHOD:PUBLISH',
				'END:VCALENDAR'
			].join("\r\n");

			let jcalData = ICAL.parse(iCalendarData);
			let vcalendar = new ICAL.Component(jcalData);

			for (const event of allEvents) {
				const category = await Category.findOne({ _id: event.idCategory });

				let anEvent = [
					'BEGIN:VEVENT',
					'UID:' + event._id,
					'DTSTART:' + new Date(parseInt(event.date, 10)),
					'LOCATION:' + event.location,
					'SUMMARY:' + event.title,
					'DESCRIPTION:' + event.description.substring(0, 60),
					'CATEGORIES:' + category.name,
					'DTSTAMP:' + new Date(Date.now()),
					'END:VEVENT'
				].join("\r\n");

				let jcalDataEvent = ICAL.parse(anEvent);
				let vcalendarEvent = new ICAL.Component(jcalDataEvent);
				vcalendar.addSubcomponent(vcalendarEvent);
			}
			let data = {
				iCalendarString: vcalendar.toString()
			};
			writer.writeSuccess(res, data);
		} catch (err) {
			throw err;
		}
	}
}