import type { WebSocket } from 'ws';
import type { IIncomingDataAuth } from './types/types.ts';

const initLoginHandlers = async (
  ws: WebSocket,
  clients: Set<WebSocket>,
) => {
  

  ws.on('message', async (data) => {
    try {
      const decodedData = JSON.parse(data.toString()) as IIncomingDataAuth;

      switch (decodedData.type) {
        case 'LOGIN':
          break;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  ws.on('close', () => {
    console.log(`Connected clients after disconnect:`, clients.size);
  });

  ws.on('error', console.error);
};

export default initLoginHandlers;
