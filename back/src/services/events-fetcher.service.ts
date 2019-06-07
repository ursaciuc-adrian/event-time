import request from 'async-request';

import Category from '../models/category.model';
import Event from '../models/event.model';
import categoryModel from '../models/category.model';

import * as emailSender from '../services/email-sender.service';

export async function fetchEvents(): Promise<void> {
	const categories = await Category.find({ originName: 'eventbrite' });

	let message = 'Check out our new events: \n\n';

	for (const category of categories) {
		const events = await Event.find({ checked: false, idCategory: category._id });

		message += category.name + '\n';

		for (const event of events) {
			message += event.title + '\n';
		}

		message += '\n-------------------------------\n';
	}

	emailSender.sendEmail('ursaciuc.adrian27@gmail.com', 'New events', message);
}

export async function getEventbriteEvents(): Promise<void> {
	try {
		const categories = await Category.find({ originName: 'eventbrite' });

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
		const categories = await Category.find({ originName: 'meetup' });
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

						if (count === 0) {
							const obj = new Event({
								idOrigin: element.id,
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