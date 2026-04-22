import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { grey, pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useUserStore } from '@/entities/user/model/userStore';
import { schemaRegister, type RegisterFormData } from './lib/validation';
import type { IRegister } from '@/entities/user/model/types';
import useRegister from '../../model/useRegister';
import type { ChangeEvent } from 'react';
import FileInput from '@/shared/ui/FileInput/FileInput';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { loading } = useUserStore((state) => state);
  const registerHandler = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schemaRegister),
  });

  const registerSubmit = (data: IRegister) => {
    try {
      registerHandler(data).then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files[0] && name === 'avatar') {
      setValue(name, files[0]);
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
        <WhatshotIcon
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
            Sign up
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: '150px',
              height: '150px',
              borderRadius: '100%',
              overflow: 'hidden',
              border: 4,
              borderColor: pink[500],
            }}
          >
            <FileInput
              label="Artist Photo"
              {...register('avatar')}
              onChange={onChangeFileHandler}
            />
            {errors.avatar && <p>{errors.avatar.message}</p>}
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit(registerSubmit)}>
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
            <TextField
              id="outlined-basic"
              label="Display name"
              variant="outlined"
              type="text"
              {...register('display_name')}
              sx={{
                width: '100%',
              }}
              error={!!errors.display_name}
              helperText={errors.display_name?.message}
            />
            <TextField
              id="outlined-basic"
              label="Phone number (+996)"
              variant="outlined"
              type="tel"
              {...register('phone_number')}
              sx={{
                width: '100%',
              }}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
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
            Sign up
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
          <Typography>already have a blip account?</Typography>
          <Typography
            component={Link}
            to={'/login'}
            sx={{
              textDecoration: 'none',
              fontWeight: 700,
              color: pink[500],
            }}
          >
            sign in
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;
