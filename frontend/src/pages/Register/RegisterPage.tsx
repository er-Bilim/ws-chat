import RegisterForm from '@features/auth/register/ui/form/RegisterForm';
import Box from '@mui/material/Box';

const RegisterPage = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
