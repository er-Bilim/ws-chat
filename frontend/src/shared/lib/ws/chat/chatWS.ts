import { WSS_URL } from '@/shared/constants/constants';
import type { RefObject } from 'react';
import type { IIncomingDataChat } from './types';
import { toast } from 'react-toastify';

interface IChatWSState {
  wsRef: RefObject<WebSocket | null> | null;
  reconnectAttempts: number;
  manualClose: boolean;
  isReconnecting: boolean;
  reconnectTimer: ReturnType<typeof setTimeout> | null;
  connect: (callback: (state: IIncomingDataChat) => void) => void;
  handleReconnect: (callback: (state: IIncomingDataChat) => void) => void;
  closeWS: () => void;
  setWsRef: (wsRef: RefObject<WebSocket | null>) => void;
}

const ChatWS: IChatWSState = {
  wsRef: null,
  reconnectAttempts: 0,
  manualClose: false,
  isReconnecting: false,
  reconnectTimer: null,
  connect: function (callback) {
    if (!this.wsRef) return;

    if (
      this.wsRef.current &&
      (this.wsRef.current.readyState === WebSocket.OPEN ||
        this.wsRef.current.readyState === WebSocket.CONNECTING)
    )
      return;

    const websocket = new WebSocket(`${WSS_URL}/chat`);

    websocket.onopen = () => {
      this.reconnectAttempts = 0;
      this.isReconnecting = false;
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    };

    websocket.onmessage = (event) => {
      const data: IIncomingDataChat = JSON.parse(event.data);
      callback(data);
    };

    websocket.onclose = (event) => {
      if (this.manualClose) {
        this.manualClose = false;
        this.isReconnecting = false;
        return;
      }

      if (event.code !== 1000 && !this.isReconnecting) {
        toast.warn('Reconnecting');
        this.handleReconnect(callback);
      }
    };

    this.wsRef.current = websocket;
  },

  handleReconnect: function (callback: (state: IIncomingDataChat) => void) {
    if (this.isReconnecting) return;
    this.isReconnecting = true;

    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.isReconnecting = false;
      this.reconnectAttempts++;
      this.connect(callback);
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

export default ChatWS;
