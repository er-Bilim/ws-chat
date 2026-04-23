import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IMessage, INewMessage } from './types';

interface IMessagesState {
  messages: IMessage[];
  message: string;
  actions: {
    setMessages: (data: IMessage[]) => void;
    setMessage: (data: string) => void;
    addMessage: (newMessage: INewMessage) => void;
  };
}

export const useMessagesStore = create<IMessagesState>()(
  devtools(
    (set) => ({
      messages: [],
      actions: {
        setMessages(data) {
          set({
            messages: data,
          });
        },
        setMessage(data) {
          set({
            message: data,
          });
        },
        addMessage(newMessage) {
          set((state) => {
            return {
              messages: [...state.messages, newMessage],
            };
          });
        },
      },
    }),
    {
      name: 'messagesStore',
      enabled: true,
    },
  ),
);

export const useMessagesActions = () =>
  useMessagesStore((state) => state.actions);
