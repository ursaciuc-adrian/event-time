"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_controller_1 = require("../controllers/events.controller.");
const url_1 = __importDefault(require("url"));
class EventRoutes {
    constructor() {
        this.eventsController = new events_controller_1.EventsController();
    }
    route(req, res) {
        const reqUrl = url_1.default.parse(req.url, true);
        if (reqUrl.pathname === '/events' && req.method === 'GET') {
            this.eventsController.getEvents(req, res);
        }
    }
}
exports.EventRoutes = EventRoutes;
//# sourceMappingURL=event.routes.js.map