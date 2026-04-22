import UserAvatar from '@/entities/user/ui/UserAvatar/UserAvatar';
import UserDisplayName from '@/entities/user/ui/UserDisplayName/UserDisplayName';
import UserName from '@/entities/user/ui/Username/Username';
import Box from '@mui/material/Box';
import { green, grey, pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface IChatListItem {
  user: {
    _id: string;
    display_name: string;
    username: string;
    avatar: string;
  };
  ownUserID: string;
}

const ChatListItem: FC<IChatListItem> = ({ user, ownUserID }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: '60px',
            borderRadius: '100%',
            overflow: 'hidden',
            border: 3,
            borderColor: pink[500],
          }}
        >
          <Box
            sx={{
              borderRadius: '100%',
              border: 3,
              borderColor: green['A200'],
            }}
          >
            <UserAvatar avatarURL={user.avatar} userID={user._id} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              color: grey[900],
              fontWeight: 800,
              fontSize: '1.3rem',
              letterSpacing: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box>
              <UserDisplayName displayName={user.display_name} />
            </Box>
            {user._id === ownUserID && (
              <Typography
                sx={{
                  color: pink[200],
                }}
              >
                (you)
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              color: pink[500],
              fontWeight: 200,
              letterSpacing: 3,
              // fontSize: '1.3rem',
            }}
          >
            <UserName username={user.username} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatListItem;
