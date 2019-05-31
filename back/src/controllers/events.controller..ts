import * as EventService from '../services/events.service';
import * as writer from '../utils/writer.util';

export class EventsController {
	public getEvents(request, response): void {
		writer.writeJson(response, EventService.getEvents());
	}
}
