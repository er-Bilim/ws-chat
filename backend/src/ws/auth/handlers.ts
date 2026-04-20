import type { WebSocket } from 'ws';
import type { IIncomingDataAuth } from './types/types.ts';
import UsersService from '../../services/users/users.service.ts';

const initLoginHandlers = (ws: WebSocket, clients: Set<WebSocket>) => {
  ws.on('message', async (data) => {
    try {
      const decodedData = JSON.parse(data.toString()) as IIncomingDataAuth;

      switch (decodedData.type) {
        case 'LOGIN':
          const user = await UsersService.getUserByRefreshToken(
            decodedData.payload.refreshToken,
          );

          if (!user) {
            return ws.send(
              JSON.stringify({
                error: 'User not found',
              }),
            );
          }

          ws.send(JSON.stringify(user));

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
};

export default initLoginHandlers;
