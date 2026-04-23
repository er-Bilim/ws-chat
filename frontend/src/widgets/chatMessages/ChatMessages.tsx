import {
  useMessagesActions,
  useMessagesStore,
} from '@/entities/message/model/messagesStore';
import MessageItem from '@/entities/message/ui/MessageItem/MessageItem';
import UserAvatar from '@/entities/user/ui/UserAvatar/UserAvatar';
import UserName from '@/entities/user/ui/Username/Username';
import SendMessageForm from '@/features/auth/sendMessage/ui/form/SendMessageForm';
import ChatWS from '@/shared/lib/ws/chat/chatWS';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import SAD_PIG from '@assets/images/placeholder/pig.png';
import { useUserStore } from '@/entities/user/model/userStore';
import type { CSSProperties } from '@mui/material/styles';

const ownMessageStyle: CSSProperties = {
  color: pink[500],
  backgroundColor: pink[50],
  border: 1,
  borderColor: pink[500],
};

const messageStyle: CSSProperties = {
  position: 'relative',
  background: pink[500],
  color: pink[50],
  padding: 2,
  borderRadius: 3,
};

const ChatMessages = () => {
  const { user } = useUserStore((state) => state);
  const { message, messages } = useMessagesStore((state) => state);
  const { setMessages, addMessage } = useMessagesActions();
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  ChatWS.setWsRef(ws);

  useEffect(() => {
    let isUnmounted: boolean = false;
    ChatWS.connect((data) => {
      if (isUnmounted) return;

      switch (data.type) {
        case 'LAST_MESSAGES':
          setMessages(data.payload);
          break;
        case 'SEND':
          ws.current?.send(
            JSON.stringify({
              type: 'SEND',
              payload: {
                message: message,
              },
            }),
          );
          break;
        case 'NEW':
          addMessage(data.payload);
          break;
      }
    });

    return () => {
      isUnmounted = true;

      ChatWS.closeWS();
    };
  }, []);

  const renderMessages = () => {
    if (messages.length === 0)
      return (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                letterSpacing: 3,
              }}
            >
              No messages
            </Typography>
            <Box
              component={'img'}
              src={SAD_PIG}
              alt="sad pig :("
              sx={{
                width: '50px',
              }}
            />
          </Box>
        </>
      );

    return (
      <>
        {messages.map((message) => (
          <Box
            key={message._id}
            sx={{
              display: 'flex',
              flexDirection:
                user?._id === message.user._id ? 'row-reverse' : 'row',
              gap: 3,
              alignItems: 'flex-end',
              paddingRight: 10,
            }}
          >
            <Box
              sx={{
                width: '50px',
                borderRadius: '100%',
                overflow: 'hidden',
              }}
            >
              <UserAvatar
                userID={message.user._id}
                avatarURL={message.user.avatar}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Box
                sx={{
                  ...messageStyle,
                  ...(user && user._id === message.user._id
                    ? { ...ownMessageStyle }
                    : undefined),
                }}
              >
                <MessageItem message={message.content} />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -10,
                    background: pink[500],
                    width: 0,
                    height: 0,
                    borderLeft: `10px solid #fff`,
                    borderRight: `10px solid #fff`,
                    borderTop: `10px solid ${pink[500]}`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  letterSpacing: 3,
                }}
              >
                <UserName username={message.user.username} />
              </Box>
            </Box>
          </Box>
        ))}
        <Box ref={messagesEndRef}></Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxHeight: '82vh',
          height: '82vh',
          overflow: 'auto',
        }}
      >
        {renderMessages()}
      </Box>
      <SendMessageForm />
    </Box>
  );
};

export default ChatMessages;
