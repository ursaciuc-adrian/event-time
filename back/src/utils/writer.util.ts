export function writeJson(response, value, code?) {
	if (typeof value === 'object') {
		value = JSON.stringify(value, undefined, 4);
	}

	if (!code) {
		code = 200;
	}

	response.writeHead(code, { 'Content-Type': 'application/json' });
	response.end(value);
}

export function writeSuccessMessage(response, message): void {
	writeJson(response, { status: 'ok', message }, 200);
}