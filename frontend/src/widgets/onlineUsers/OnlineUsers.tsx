import ChatListItem from '@/entities/chat/ui/ChatListItem/ChatListItem';
import { useUserActions, useUserStore } from '@/entities/user/model/userStore';
import AuthWS from '@/shared/lib/ws/auth/authWS';
import Box from '@mui/material/Box';
import { green, pink, red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const OnlineUsers = () => {
  const { users, user } = useUserStore();
  const { setUsers, addUser } = useUserActions();
  const ws = useRef<WebSocket | null>(null);

  AuthWS.setWsRef(ws);
  useEffect(() => {
    AuthWS.connect((data) => {
      switch (data.type) {
        case 'LOGIN':
          toast.success(`Hello, ${data.payload.display_name}`);
          break;
        case 'USER_CONNECTED':
          addUser(data.payload);
          break;
        case 'USER_LIST':
          setUsers(data.payload);
          break;
      }
    });

    return () => {
      if (ws.current) {
        const websocketClose = ws.current;
        ws.current = null;

        setTimeout(() => {
          if (
            websocketClose.readyState === WebSocket.OPEN ||
            websocketClose.readyState === WebSocket.CONNECTING
          ) {
            websocketClose.close();
          }
        }, 0);
      }
    };
  }, [setUsers, addUser]);

  const renderOnlineUsers = () => {
    if (!user) return null;

    return (
      <>
        {users.map((client) => (
          <ChatListItem user={client} ownUserID={user._id} key={client._id} />
        ))}
      </>
    );
  };

  return (
    <Box
      sx={{
        width: '350px',
        backgroundColor: red[50],
        height: '100vh',
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: pink[500],
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <Typography
          sx={{
            padding: 1,
            letterSpacing: 3,
            color: pink[50],
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Online users
        </Typography>
        <Box
          sx={{
            width: '15px',
            height: '15px',
            backgroundColor: green['A200'],
            borderRadius: '100%',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginTop: 5,
        }}
      >
        {renderOnlineUsers()}
      </Box>
    </Box>
  );
};

export default OnlineUsers;
