import { useUserStore } from '@/entities/user/model/userStore';
import UserAvatar from '@/entities/user/ui/UserAvatar/UserAvatar';
import UserDisplayName from '@/entities/user/ui/UserDisplayName/UserDisplayName';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey, pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '@/features/auth/logout/model/useLogout';

const ChatSidebar = () => {
  const logout = useLogout();
  const { user } = useUserStore((state) => state);

  const renderUserInfo = () => {
    if (!user) {
      return (
        <>
          <>
            <Typography>where are you?</Typography>
          </>
        </>
      );
    }

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: '50px',
                height: '50px',
                borderRadius: '100%',
                overflow: 'hidden',
                border: 5,
                borderColor: grey[50],
              }}
            >
              <UserAvatar avatarURL={user.avatar} userID={user._id} />
            </Box>
            <Box
              sx={{
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                color: grey[50],
                fontSize: '1.4rem',
                letterSpacing: 5,
                fontWeight: 700,
              }}
            >
              <UserDisplayName displayName={user.display_name} />
            </Box>
          </Box>
          <Button
            onClick={logout}
            sx={{
              background: grey[50],
              color: pink[500],
              borderRadius: '100%',
              minWidth: '40px',
              width: '40px',
              height: '40px',
              overflow: 'hidden',
            }}
          >
            <LogoutIcon
              sx={{
                fontSize: '20px',
              }}
            />
          </Button>
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        background: pink[500],
        padding: 2,
        height: '100vh',
      }}
    >
      {renderUserInfo()}
    </Box>
  );
};

export default ChatSidebar;
