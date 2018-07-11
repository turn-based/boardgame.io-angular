import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import express from 'express';
import cors from 'cors';

import { createServer, Server as HttpServer } from 'http';

import { ChatRoom } from './chat-room';

const app = express();

const server = createServer(app);
const gameServer = new Server({ server });

gameServer.register('chat', ChatRoom);

app.use('/colyseus', cors(), monitor(gameServer));

gameServer.onShutdown(function () {
  console.log(`game server is going down.`);
});

const PORT = 8000;
gameServer.listen(PORT, undefined, undefined, function (this: HttpServer) {
  console.log('HTTP listening on ', this.address());
});