import type { WebSocket } from 'ws';

const initChatHandlers = (ws: WebSocket, clients: Set<WebSocket>) => {
  ws.on('close', () => {
    console.log(`Connected clients after disconnect:`, clients.size);
  });
};

export default initChatHandlers;
