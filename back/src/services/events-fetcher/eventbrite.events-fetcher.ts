import request from 'async-request';

import { IEvent } from '../../models/event.model';
import { IEventsFetcher } from './events-fetcher';

export class EventbriteEventsFetcher implements IEventsFetcher {
	public getEventFromObject(obj: any): IEvent {
		return {
			idOrigin: obj.id,
			originName: 'Eventbrite',
			idCategory: obj.category_id,
			title: obj.name.text,
			description: obj.description != null ? obj.description.text : '',
			location: obj.venue != null && obj.venue.address != null ? obj.venue.address.localized_address_display : '',
			seats: obj.capacity != null ? obj.capacity : 0,
			coverPhoto: obj.logo != null ? obj.logo.url : '',
			date: obj.start.local != null ? obj.start.local : ''
		};
	}

	public getEvents(): Promise<IEvent[]> {
		throw new Error('Method not implemented.');
	}

	public async getEventsByOrganizer(id: string): Promise<IEvent[]> {
		try {
			const response = await request(
				'https://www.eventbriteapi.com/v3/events/search?organizer.id=' + id + '&expand=venue',
				{
					method: 'GET',
					headers: { Authorization: 'Bearer ANYLLDVFBO24ROUAOV5G' }
				});

			const body = JSON.parse(response.body);

			const events: IEvent[] = [];
			for (const element of body.events) {
				events.push(this.getEventFromObject(element));
			}

			return events;
		} catch (err) {
			throw err;
		}
	}
}