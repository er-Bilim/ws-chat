import LoginForm from '@features/auth/login/ui/form/LoginForm';
import Box from '@mui/material/Box';

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: '600px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
