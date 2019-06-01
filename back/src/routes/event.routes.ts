import { EventsController } from "../controllers/events.controller";

import http from "http";
import url from "url";

export class EventRoutes {
  public eventsController: EventsController = new EventsController();

  public async route(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === "/events" && req.method === "GET") {
      this.eventsController.getEvents(req, res);
    }

    if (reqUrl.pathname === "/events" && req.method === "POST") {
      await this.eventsController.addEvent(req, res);
    }

  }
}

