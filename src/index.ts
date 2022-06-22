import express, { static as serveStatic } from 'express';
import { Server } from 'ws';
import { join } from 'path';

const app = express();

app.use(serveStatic(join(__dirname, '..', 'public')));

const wss = new Server({ noServer: true });
wss.on('connection', socket => {
	socket.on('message', message => console.log(message));
});

const server = app.listen(process.env.PORT || 3000);
server.on('upgrade', (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, socket => {
		wss.emit('connection', socket, request);
	});
});
