function writeJson(response, value, code?) {
	if (typeof value === 'object') {
		value = JSON.stringify(value, undefined, 4);
	}

	if (!code) {
		code = 200;
	}

	response.writeHead(code, { 'Content-Type': 'application/json' });

	value.code = code;
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
