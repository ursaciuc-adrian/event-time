import http from 'http';

export function readJson(req: http.IncomingMessage): Promise<any> {
	return new Promise((resolve, reject) => {
		let body = '';

		req.on('data', (chunk) => {
			body += chunk.toString();
		});

		req.on('end', () => {
			resolve(JSON.parse(body));
		});
	});
}
