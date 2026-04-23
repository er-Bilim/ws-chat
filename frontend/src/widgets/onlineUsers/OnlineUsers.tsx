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
  const { setUsers, addUser, removeUser } = useUserActions();
  const ws = useRef<WebSocket | null>(null);

  AuthWS.setWsRef(ws);
  useEffect(() => {
    let isUnmounted: boolean = false;
    AuthWS.connect((data) => {
      if (isUnmounted) return;

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
        case 'USER_DISCONNECTED':
          removeUser(data.payload.id);
          break;
      }
    });

    return () => {
      isUnmounted = true;

      if (ws.current) {
        const websocket = ws.current;

        if (websocket.readyState === WebSocket.OPEN) {
          websocket.close();
        } else {
          websocket.onopen = () => {
            websocket.close();
          };
        }
        ws.current = null;
      }
    };
  }, [setUsers, addUser]);

  const renderOnlineUsers = () => {
    if (!user) return null;

    return (
      <>
        {users.map((client, index) => (
          <ChatListItem user={client} ownUserID={user._id} key={client._id + index} />
        ))}
      </>
    );
  };

  return (
    <Box
      sx={{
        minWidth: '600px',
        backgroundColor: red[50],
        height: '100vh',
        padding: 3,
        borderRight: 4,
        borderColor: pink[500],
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
