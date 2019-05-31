import { Event } from '../models/event.model';

export function getEvents(): Event[] {
	return [
		{
			name: 'Event 3'
		},
		{
			name: 'Event 2'
		}
	];
}