import request from 'async-request';

import Category from '../models/category.model';
import Event from '../models/event.model';

export function fetchEvents(): void {

}

export async function getEventbriteEvents(): Promise<void> {
	try {
		const categories = await Category.find({ originName: 'eventbrite' });

		categories.forEach(async (category) => {
			try {
				const response = await request(
					'https://www.eventbriteapi.com/v3/events/search/?categories=' + category.idOrigin + '&expand=venue',
					{
						method: 'GET',
						headers: { Authorization: 'Bearer ANYLLDVFBO24ROUAOV5G' }
					});

				const body = JSON.parse(response.body);

				body.events.forEach(async (element) => {
					try {
						const count = await Event.count({ idOrigin: element.id });

						if (count === 0) {
							const obj = new Event({
								idOrigin: element.id,
								idCategory: category._id,
								title: element.name.text,
								description: element.description.text,
								location: element.venue.address.localized_address_display,
								seats: element.capacity != null ? element.capacity : 0,
								coverPhoto: element.logo != null ? element.logo.url : '',
								date: element.start.local
							});

							await obj.save();
						}
					} catch (err) {
						throw err;
					}
				});
			} catch (err) {
				throw err;
			}
		});
	} catch (err) {
		throw err;
	}
}

export async function getEventbriteEvents(): Promise<void> {
	try {
		const categories = await Category.find({ originName: 'meetup' });

		categories.forEach(async (category) => {
			try {
				const response = await request(
					'https://api.meetup.com/2/open_events?&category=' + category.idOrigin + '&sign=true&photo-host=public&key=352395f2f577c7216632a056757444',
					{
						method: 'GET'
					});

				const body = JSON.parse(response.body);

				body.results.forEach(async (element) => {
					try {
						const count = await Event.count({ idOrigin: element.id });

						if (count === 0) {
							const obj = new Event({
								idOrigin: element.id,
								idCategory: category._id,
								title: element.name,
								description: element.description,
								location: element.venue.address_1 != null ? element.venue.address_1 : '',
								seats: element.rsvp_limit != null ? element.rsvp_limit : 0,
								coverPhoto: element.photo_url != null ? element.photo_url : '',
								date: element.start.local // de modificat
							});
							// TODO : verifica pe aici 

							await obj.save();
						}
					} catch (err) {
						throw err;
					}
				});
			} catch (err) {
				throw err;
			}
		});
	} catch (err) {
		throw err;
	}
}