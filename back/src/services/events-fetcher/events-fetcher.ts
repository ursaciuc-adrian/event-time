import { IEvent } from '../../models/event.model';

export interface IEventsFetcher {
	getEventFromObject(obj: any): IEvent;
	getEvents(): Promise<IEvent[]>;
	getEventsByOrganizer(id: string): Promise<IEvent[]>;
}
