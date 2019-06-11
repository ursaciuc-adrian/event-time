import request from 'async-request';

import Category from '../../models/category.model';

import { IEvent } from '../../models/event.model';
import { IEventsFetcher } from './events-fetcher';

export class MeetupEventsFetcher implements IEventsFetcher {
	public getEventFromObject(obj: any): IEvent {
		return {

			idOrigin: obj.id,
			originName: 'Meetup',
			idCategory: '',
			title: obj.name != null ? obj.name : '',
			description: obj.description != null ? obj.description : '',
			location: obj.venue != null ? obj.venue.address_1 : '',
			seats: obj.rsvp_limit != null ? obj.rsvp_limit : 0,
			coverPhoto: obj.photo_url != null ? obj.photo_url : '',
			date: obj.time != null ? obj.time : ''

		};
	}

	public getEvents(): Promise<IEvent[]> {
		throw new Error('Method not implemented.');
	}

	public async getEventsByOrganizer(id: string): Promise<IEvent[]> {
		try {
			const response = await request(
				`https://api.meetup.com/${id}/events?key=352395f2f577c7216632a056757444`, 
				{
					method: 'GET'
				});

			const body = JSON.parse(response.body);

			const events: IEvent[] = [];
			for (const element of body) {
				const event: IEvent = this.getEventFromObject(element);
				const origincategoryId = await this.getOrganizationCategory(id);

				if (origincategoryId !== null) {
					event.idCategory = (await Category.findOne({ idOrigin: origincategoryId }))._id;
					events.push(event);
				}
			}

			return events;
		} catch (err) {
			throw err;
		}
	}

	private async getOrganizationCategory(id: string): Promise<string> {
		try {
			const response = await request(
				`https://api.meetup.com/${id}?key=352395f2f577c7216632a056757444`, 
				{
					method: 'GET'
				});

			const body = JSON.parse(response.body);

			return body.category.id;
		} catch (err) {
			throw err;
		}
	}
}