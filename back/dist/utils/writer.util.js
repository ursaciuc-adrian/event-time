"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function writeJson(response, value, code) {
    if (typeof value === 'object') {
        value = JSON.stringify(value, undefined, 4);
    }
    if (!code) {
        code = 200;
    }
    response.writeHead(code, { 'Content-Type': 'application/json' });
    response.end(value);
}
exports.writeJson = writeJson;
//# sourceMappingURL=writer.util.js.map