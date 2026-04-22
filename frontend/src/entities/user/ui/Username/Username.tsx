import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface IUsernameProps {
  username: string;
}

const UserName: FC<IUsernameProps> = ({ username }) => {
  return (
    <>
      <Typography
        sx={{
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          letterSpacing: 'inherit',
          writingMode: 'inherit',
          textOrientation: 'inherit',
        }}
      >
        {username}
      </Typography>
    </>
  );
};

export default UserName;
