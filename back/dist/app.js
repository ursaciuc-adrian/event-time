"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_controller_1 = require("./controllers/events.controller.");
const mongoose_1 = __importDefault(require("mongoose"));
const url_1 = __importDefault(require("url"));
const hostname = '127.0.0.1';
const port = 3000;
// http.createServer((req, res) => {
// 	const reqUrl = url.parse(req.url, true);
// 	if (reqUrl.pathname === '/events' && req.method === 'GET') {
// 		EventController.getEvents(req, res);
// 	}
// }).listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}/`);
// });
class App {
    constructor() {
        this.eventsController = new events_controller_1.EventsController();
        this.MONGO_URL = 'mongodb://localhost:27017/eventtime';
        this.config();
    }
    getApp() {
        return (req, res) => {
            const reqUrl = url_1.default.parse(req.url, true);
            if (reqUrl.pathname === '/events' && req.method === 'GET') {
                this.eventsController.getEvents(req, res);
            }
        };
    }
    config() {
        this.mongoSetup();
    }
    mongoSetup() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.MONGO_URL, { useNewUrlParser: true });
    }
}
exports.default = new App().getApp();
//# sourceMappingURL=app.js.map