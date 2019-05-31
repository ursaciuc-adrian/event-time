"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventController = __importStar(require("./controllers/events.controller."));
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const hostname = '127.0.0.1';
const port = 3000;
http_1.default.createServer((req, res) => {
    const reqUrl = url_1.default.parse(req.url, true);
    if (reqUrl.pathname === '/events' && req.method === 'GET') {
        EventController.getEvents(req, res);
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=app.js.map