import { WSS_URL } from '@/shared/constants/constants';
import type { RefObject } from 'react';
import type { IIncomingDataAuth } from './types';
import { toast } from 'react-toastify';

interface IAuthWSState {
  wsRef: RefObject<WebSocket | null> | null;
  reconnectAttempts: number;
  manualClose: boolean;
  connect: (callback: (state: IIncomingDataAuth) => void) => void;
  handleReconnect: (callback: (state: IIncomingDataAuth) => void) => void;
  closeWS: () => void;
  setWsRef: (wsRef: RefObject<WebSocket | null>) => void;
}

const AuthWS: IAuthWSState = {
  wsRef: null,
  reconnectAttempts: 0,
  manualClose: false,
  connect: function (callback) {
    if (!this.wsRef) return;

    if (
      this.wsRef.current &&
      (this.wsRef.current.readyState === WebSocket.OPEN ||
        this.wsRef.current.readyState === WebSocket.CONNECTING)
    )
      return;

    const websocket = new WebSocket(`${WSS_URL}/login`);

    websocket.onopen = () => {
      AuthWS.reconnectAttempts = 0;
    };

    websocket.onmessage = (event) => {
      const data: IIncomingDataAuth = JSON.parse(event.data);
      callback(data);
    };

    websocket.onclose = (event) => {
      if (AuthWS.manualClose) {
        AuthWS.manualClose = false;
        return;
      }

      if (event.code !== 1000) {
        toast.warn('Reconnecting');
        this.handleReconnect(callback);
      }
    };

    this.wsRef.current = websocket;
  },

  handleReconnect: function (callback: (state: IIncomingDataAuth) => void) {
    const delay = Math.min(1000 * Math.pow(2, AuthWS.reconnectAttempts), 30000);

    setTimeout(() => {
      AuthWS.reconnectAttempts++;
      AuthWS.connect(callback);
    }, delay);
  },

  closeWS: function () {
    if (!this.wsRef) return;
    if (!this.wsRef.current) return;

    this.manualClose = true;

    this.wsRef.current.close(1000, 'logout');
    this.wsRef.current = null;
  },

  setWsRef: function (wsRef) {
    this.wsRef = wsRef;
  },
};

export default AuthWS;
