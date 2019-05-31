"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function writeJson(response, value, code) {
    if (typeof value === 'object') {
        value = JSON.stringify(value, null, 4);
    }
    if (!code) {
        code = 200;
    }
    response.writeHead(code, { 'Content-Type': 'application/json' });
    response.end(value);
}
exports.writeJson = writeJson;
// var writeJson = exports.writeJson = function (response, arg1, arg2) {
// 	var code;
// 	var payload;
// 	if (arg1 && arg1 instanceof ResponsePayload) {
// 		writeJson(response, arg1.payload, arg1.code);
// 		return;
// 	}
// 	if (arg2 && Number.isInteger(arg2)) {
// 		code = arg2;
// 	}
// 	else {
// 		if (arg1 && Number.isInteger(arg1)) {
// 			code = arg1;
// 		}
// 	}
// 	if (code && arg1) {
// 		payload = arg1;
// 	}
// 	else if (arg1) {
// 		payload = arg1;
// 	}
// 	if (!code) {
// 		code = 200;
// 	}
// 	if (typeof payload === 'object') {
// 		payload = JSON.stringify(payload, null, 2);
// 	}
// 	response.writeHead(code, { 'Content-Type': 'application/json' });
// 	response.end(payload);
// }
//# sourceMappingURL=writer.js.map