"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventService = __importStar(require("../services/events.service"));
const writer = __importStar(require("../utils/writer.util"));
function getEvents(request, response) {
    writer.writeJson(response, EventService.getEvents());
}
exports.getEvents = getEvents;
//# sourceMappingURL=events.controller..js.map