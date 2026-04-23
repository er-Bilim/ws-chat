import type { Server } from 'http';
import { WebSocketServer } from 'ws';
import initChatHandlers from './chat/handlers.ts';
import initLoginHandlers from './auth/handlers.ts';
import type { Request } from 'express';
import UsersService from '../services/users/users.service.ts';
import type { CustomWebSocket } from './ws.types.ts';
import * as cookie from 'cookie';
import MessageService from '../services/message/message.service.ts';

const initWebsocket = (server: Server) => {
  const wsLogin = new WebSocketServer({ noServer: true });
  const wsChat = new WebSocketServer({ noServer: true });

  wsLogin.on(
    'connection',
    async function connection(ws: CustomWebSocket, req: Request) {
      console.log('Logged Users:', wsLogin.clients.size);

      const accessToken = cookie.parse(req.headers.cookie || '').accessToken;

      if (!accessToken) {
        ws.close(1008, 'Unauthorized');
        return;
      }

      try {
        const user = await UsersService.getUserByAccessToken(accessToken);

        if (!user) {
          ws.close(4000, 'User not found');
          return;
        }

        ws.userID = user.id;
        ws.user = user;

        const wsSendLoginData = {
          type: 'LOGIN',
          payload: user,
        };

        ws.send(JSON.stringify(wsSendLoginData));

        const allOnlineUsers = Array.from(wsLogin.clients)
          .map((client) => (client as CustomWebSocket).user)
          .filter((user) => user !== undefined);

        ws.send(
          JSON.stringify({
            type: 'USER_LIST',
            payload: allOnlineUsers,
          }),
        );

        const connectedUsers = {
          type: 'USER_CONNECTED',
          payload: user,
        };

        wsLogin.clients.forEach((client) => {
          if (ws !== client && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(connectedUsers));
          }
        });
      } catch (error) {
        ws.close(1011, 'Internal server error');
      }

      initLoginHandlers(ws, wsLogin.clients);
    },
  );

  wsChat.on(
    'connection',
    async function connection(ws: CustomWebSocket, req: Request) {
      console.log('Connection Users in chat:', wsChat.clients.size);

      const accessToken = cookie.parse(req.headers.cookie || '').accessToken;

      if (!accessToken) {
        ws.close(1008, 'Unauthorized');
        return;
      }

      try {
        const user = await UsersService.getUserByAccessToken(accessToken);

        if (!user) {
          ws.close(4000, 'User not found');
          return;
        }

        ws.userID = user.id;
        ws.user = user;

        const lastMessages = await MessageService.getLastMessages(30);
        ws.send(
          JSON.stringify({
            type: 'SEND',
            payload: lastMessages,
          }),
        );
      } catch (error) {
        ws.close(1011, 'Internal server error');
      }

      initChatHandlers(ws, wsChat.clients);
    },
  );

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
