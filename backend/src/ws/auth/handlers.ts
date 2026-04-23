import type { WebSocket } from 'ws';
import type { CustomWebSocket } from '../ws.types.ts';

const initLoginHandlers = async (
  ws: CustomWebSocket,
  clients: Set<WebSocket>,
) => {
  ws.on('close', () => {
    console.log(`User ${ws.user?.username} disconnected`);

    const disconnectMessage = JSON.stringify({
      type: 'USER_DISCONNECTED',
      payload: { id: ws.userID },
    });

    clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(disconnectMessage);
      }
    });
  });

  ws.on('error', console.error);
};

export default initLoginHandlers;
