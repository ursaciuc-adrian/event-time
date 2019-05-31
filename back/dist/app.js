"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const event_routes_1 = require("./routes/event.routes");
class App {
    constructor() {
        this.eventRoutes = new event_routes_1.EventRoutes();
        this.MONGO_URL = 'mongodb://localhost:27017/eventtime';
        this.app = this.getApp();
        this.config();
    }
    getApp() {
        return (req, res) => {
            this.eventRoutes.route(req, res);
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
exports.default = new App().app;
//# sourceMappingURL=app.js.map