import type { Server } from 'http';
import { WebSocketServer } from 'ws';
import initChatHandlers from './chat/handlers.ts';
import initLoginHandlers from './auth/handlers.ts';

const initWebsocket = (server: Server) => {
  const wsLogin = new WebSocketServer({ noServer: true });
  const wsChat = new WebSocketServer({ noServer: true });

  wsLogin.on('connection', function connection(ws) {
    console.log('Connection Users:', wsLogin.clients.size);

    initLoginHandlers(ws, wsLogin.clients);
  });

  wsChat.on('connection', function connection(ws) {
    console.log('Connection Users:', wsChat.clients.size);

    initChatHandlers(ws, wsChat.clients);
  });

  server.on('upgrade', (request, socket, head) => {
    if (!request.url) return null;

    const { pathname } = new URL(request.url, 'wss://base.url');

    switch (pathname) {
      case '/login':
        wsLogin.handleUpgrade(request, socket, head, function done(ws) {
          wsLogin.emit('connection', ws, request);
        });
        break;
      case '/chat':
        wsChat.handleUpgrade(request, socket, head, function done(ws) {
          wsChat.emit('connection', ws, request);
        });
        break;
      default:
        socket.destroy();
    }
  });
};

export default initWebsocket;
