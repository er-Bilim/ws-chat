import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface IMessageItem {
  message: string;
}

const MessageItem: FC<IMessageItem> = ({ message }) => {
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
      {message}
    </Typography>
  );
};

export default MessageItem;
