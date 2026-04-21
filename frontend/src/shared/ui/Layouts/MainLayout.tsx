import Box from '@mui/material/Box';
import type { FC, PropsWithChildren } from 'react';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} component={'main'}>
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
