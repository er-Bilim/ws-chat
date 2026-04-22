import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface IUserDisplayName {
  displayName: string;
}

const UserDisplayName: FC<IUserDisplayName> = ({ displayName }) => {
  return (
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
      {displayName}
    </Typography>
  );
};

export default UserDisplayName;
