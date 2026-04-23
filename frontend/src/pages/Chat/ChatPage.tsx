import ChatMessages from '@/widgets/chatMessages/ChatMessages';
import OnlineUsers from '@/widgets/onlineUsers/OnlineUsers';
import Box from '@mui/material/Box';

const ChatPage = () => {
  return (
    <Box>
      <OnlineUsers/>
      <ChatMessages/>
    </Box>
  );
};

export default ChatPage;