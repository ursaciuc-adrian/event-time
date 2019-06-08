function writeJson(response, value, code?) {
	if (!code) {
		code = 200;
	}
	value.code = code;

	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Max-Age': 2592000 // 30 days
		/** add other headers as per requirement */
	};

	response.writeHead(code, headers);
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
