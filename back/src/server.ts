import http from 'http';
import app from './app';

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

http.createServer(app).listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
