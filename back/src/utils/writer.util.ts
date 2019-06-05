function writeJson(response, value, code?) {
	if (!code) {
		code = 200;
	}
	value.code = code;

	response.writeHead(code, { 'Content-Type': 'application/json' });

	if (typeof value === 'object') {
		value = JSON.stringify(value, undefined, 4);
	}
	response.end(value);
}

export function writeSuccess(response, data, code?): void {
	writeJson(response, {
		status: 'success',
		data
	}, code);
}

export function writeError(response, data, code): void {
	writeJson(response, {
		status: 'fail',
		data
	}, code);
}
