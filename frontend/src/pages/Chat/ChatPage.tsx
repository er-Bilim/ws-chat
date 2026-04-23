import ChatMessages from '@/widgets/chatMessages/ChatMessages';
import OnlineUsers from '@/widgets/onlineUsers/OnlineUsers';
import Box from '@mui/material/Box';

const ChatPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
      }}
    >
      <OnlineUsers />
      <ChatMessages />
    </Box>
  );
};

export default ChatPage;
