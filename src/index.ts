import express, { static as serveStatic } from 'express';
import { Server, WebSocket } from 'ws';
import { join } from 'path';

interface socketStatus {
	socket: WebSocket;
	timer: NodeJS.Timeout;
	isAlive: boolean;
}

let webSocketStatuses: socketStatus[] = [];

const app = express();

app.use(serveStatic(join(__dirname, '..', 'public')));

const wss = new Server({ noServer: true });
wss.on('connection', socket => {
	webSocketStatuses.push({
		socket,
		isAlive: true,
		timer: setInterval(() => {
			const socketIndex = webSocketStatuses.findIndex(
				status => status.socket === socket
			);
			if (!webSocketStatuses[socketIndex].isAlive) socket.terminate();
			else {
				webSocketStatuses[socketIndex].isAlive = false;
				socket.ping();
			}
		}, 15000),
	});
	socket.on('pong', () => {
		webSocketStatuses.find(status => status.socket === socket).isAlive =
			true;
	});
	socket.on('close', () => {
		const index = webSocketStatuses.findIndex(
			status => status.socket === socket
		);
		clearInterval(webSocketStatuses[index].timer);
		webSocketStatuses.splice(index, 1);
	});
});

const server = app.listen(process.env.PORT || 3000);
server.on('upgrade', (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, socket => {
		wss.emit('connection', socket, request);
	});
});
