import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { grey, pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useUserStore } from '@/entities/user/model/userStore';
import { schemaLogin, type LoginFormData } from './lib/validation';
import type { ILogin } from '@/entities/user/model/types';
import useLogin from '../../model/useLogin';
import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';
import Alert from '@mui/material/Alert';

const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, error } = useUserStore((state) => state);
  const loginHandler = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaLogin),
  });

  const loginSubmit = (data: ILogin) => {
    try {
      loginHandler(data).then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: pink[500],
        }}
      >
        <CrueltyFreeIcon
          sx={{
            fontSize: '60px',
            marginBottom: '15px',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          border: `1px solid ${grey[900]}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          borderRadius: '22px',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            component="p"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: 10,
              fontWeight: 100,
              fontSize: '2rem',
              color: grey[900],
            }}
          >
            Sign in
          </Typography>
        </Box>
        {error && <Alert severity="error">{error.error}</Alert>}
        <Box component="form" onSubmit={handleSubmit(loginSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              {...register('username')}
              sx={{
                width: '100%',
              }}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="password"
              {...register('password')}
              sx={{
                width: '100%',
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              width: '100%',
              background: pink[500],
              letterSpacing: 4,
              padding: '10px 0',
              fontWeight: 100,
              borderRadius: '22px',
            }}
            loading={loading}
          >
            Sign in
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            backgroundColor: pink[500],
            height: '1px',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: 1,
            textTransform: 'uppercase',
            letterSpacing: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>new to blip?</Typography>
          <Typography
            component={Link}
            to={'/signup'}
            sx={{
              textDecoration: 'none',
              fontWeight: 700,
              color: pink[500],
            }}
          >
            sign up
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
