import * as EventService from '../services/events.service';
import * as writer from '../utils/writer.util';

export function getEvents(request, response) {
	writer.writeJson(response, EventService.getEvents());
}
