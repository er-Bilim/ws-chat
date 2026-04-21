import type { WebSocket } from 'ws';
import type { IUserSend } from '../types/user.types.ts';

export interface CustomWebSocket extends WebSocket {
  userID: string;
  user: IUserSend;
}
