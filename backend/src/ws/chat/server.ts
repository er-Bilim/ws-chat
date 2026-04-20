import type { Server } from 'http';
import { WebSocketServer } from 'ws';
import initChatHandlers from './handlers.ts';

const initWebsocket = (server: Server) => {
  const wsChat = new WebSocketServer({ noServer: true });

  wsChat.on('connection', function connection(ws) {
    console.log('Connection Users:', wsChat.clients.size);

    initChatHandlers(ws, wsChat.clients);
  });

  server.on('upgrade', (request, socket, head) => {
    if (!request.url) return null;

    const { pathname } = new URL(request.url, 'wss://base.url');

    if (pathname === '/chat') {
      wsChat.handleUpgrade(request, socket, head, function done(ws) {
        wsChat.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });
};

export default initWebsocket;
