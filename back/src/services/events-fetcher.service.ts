import request from 'async-request';

import Category from '../models/category.model';
import Event, { IEvent } from '../models/event.model';
import Follower from '../models/follower.model';
import User from '../models/user.model';

import * as emailSender from '../services/email-sender.service';
import { EventbriteEventsFetcher } from './events-fetcher/eventbrite.events-fetcher';
import { MeetupEventsFetcher } from './events-fetcher/meetup.events-fetcher';

export async function checkForNotifications(): Promise<any> {
	let emailsSent = 0;
	const users = await User.find({});
	for (const user of users) {
		if (user.subscriptions.length > 0) {
			const categories = await Category.find({ _id: { $in: user.subscriptions } });

			let message = 'Check out our new events: \n\n';

			let hasEvents = false;
			for (const category of categories) {
				const events = await Event.find({ checked: false, idCategory: category._id });

				if (events.length > 0) {
					hasEvents = true;

					message += category.name + '\n------------------------\n';

					for (const event of events) {
						message += event.title + '\n';
					}

					message += '\n\n';
				}
			}

			if (hasEvents) {
				emailSender.sendEmail(user.email, 'New events', message);
				emailsSent++;
			}
		}
	}

	await Event.update({}, { checked: true }, { multi: true });

	return emailsSent;
}

export async function checkForEvents(): Promise<any> {
	const followers = await Follower.find({});

	let events: IEvent[] = [];

	const eventbrite = new EventbriteEventsFetcher();
	const meetup = new MeetupEventsFetcher();

	for (const follower of followers) {
		if (follower.originName === 'meetup') {
			events = events.concat(await meetup.getEventsByOrganizer(follower.idOrigin));
		}
		if (follower.originName === 'eventbrite') {
			events = events.concat(await eventbrite.getEventsByOrganizer(follower.idOrigin));
		}
	}

	const newEvents = [];
	for (const event of events) {
		const newObj = new Event(event);
		try {
			const count = await Event.countDocuments({ idOrigin: newObj.idOrigin });

			if (count === 0) {
				const saveObj = await newObj.save();
				newEvents.push(saveObj);
			}
		} catch (err) {
			// do nothing
			console.log(err);
		}
	}

	return newEvents;
}

export async function getEventbriteEvents(): Promise<void> {
	try {
		const categories = await Category.find({ originName: 'Eventbrite' });

		for (const category of categories) {
			try {
				const response = await request(
					'https://www.eventbriteapi.com/v3/events/search/?categories=' + category.idOrigin + '&expand=venue',
					{
						method: 'GET',
						headers: { Authorization: 'Bearer ANYLLDVFBO24ROUAOV5G' }
					});

				const body = JSON.parse(response.body);

				for (const element of body.events) {
					try {
						const count = await Event.count({ idOrigin: element.id, title: element.name.text });

						if (count === 0) {
							const obj = new Event({
								idOrigin: element.id,
								originName: 'Eventbrite',
								idCategory: category._id,
								title: element.name.text,
								description: element.description != null ? element.description.text : "",
								location: element.venue != null && element.venue.address != null ? element.venue.address.localized_address_display : '',
								seats: element.capacity != null ? element.capacity : 0,
								coverPhoto: element.logo != null ? element.logo.url : '',
								date: element.start.local != null ? element.start.local : ''
							});

							try {
								await obj.save();
							} catch (err) {
								// we can ignore it
							}
						}
					} catch (err) {
						// who needs this?
					}
				}
			} catch (err) {
				throw err;
			}
		}
	} catch (err) {
		throw err;
	}
}

export async function getMeetupEvents(): Promise<void> {
	try {
		const categories = await Category.find({ originName: 'Meetup' });
		for (const category of categories) {
			try {
				const response = await request(
					'https://api.meetup.com/2/open_events?&category=' + category.idOrigin +
					'&sign=true&photo-host=public&key=352395f2f577c7216632a056757444',
					{
						method: 'GET'
					});

				const body = JSON.parse(response.body);

				for (const element of body.results) {
					try {
						const count = await Event.count({ idOrigin: element.id, title: element.name });

						if (count === 0 && element.name != null && element.name.includes('?') === false) {
							const obj = new Event({
								idOrigin: element.id,
								originName: 'Meetup',
								idCategory: category._id,
								title: element.name != null ? element.name : '',
								description: element.description != null ? element.description : '',
								location: element.venue != null ? element.venue.address_1 : '',
								seats: element.rsvp_limit != null ? element.rsvp_limit : 0,
								coverPhoto: element.photo_url != null ? element.photo_url : '',
								date: element.time != null ? element.time : ''
							});

							try {
								await obj.save();
							} catch (err) {
								throw err;
							}
						}
					} catch (err) {
						throw err;
					}
				}
			} catch (err) {
				throw err;
			}
		}
	} catch (err) {
		throw err;
	}
}