import type { WebSocket } from 'ws';
import type { CustomWebSocket } from '../ws.types.ts';
import type { IIncomingDataMessage } from './types/types.ts';
import MessageService from '../../services/message/message.service.ts';

const initChatHandlers = (ws: CustomWebSocket, clients: Set<WebSocket>) => {
  ws.on('message', async (data) => {
    try {
      const decodedMessage: IIncomingDataMessage = JSON.parse(data.toString());

      switch (decodedMessage.type) {
        case 'SEND':
          const savedMessage = await MessageService.newMessage({
            user: ws.userID,
            content: decodedMessage.payload.message,
          });

          const message = {
            _id: savedMessage._id,
            user: ws.user,
            content: decodedMessage.payload.message,
          };

          const dataSendMessage = JSON.stringify({
            type: 'NEW',
            payload: message,
          });

          clients.forEach((client) => {
            if (client.readyState === 1) {
              client.send(dataSendMessage);
            }
          });

          break;
      }
    } catch (error) {
      ws.close(1011, 'Internal server error');
    }
  });

  ws.on('close', () => {
    console.log(`Connected clients after disconnect:`, clients.size);
  });

  ws.on('error', console.error);
};

export default initChatHandlers;
