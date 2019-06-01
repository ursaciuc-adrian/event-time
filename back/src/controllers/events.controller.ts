import http from "http";

import * as EventService from "../services/events.service";

export class EventsController {
  public async addEvent(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    await EventService.addEvent(req, res);
  }

  public getEvents(req, res): void {
    // writer.writeJson(response, EventService.getEvents());
  }
}
