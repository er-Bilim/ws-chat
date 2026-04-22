import ChatSidebar from '@/widgets/chatSidebar/ChatSidebar';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} component={'main'}>
        <ChatSidebar />
        <Box component={'main'}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
