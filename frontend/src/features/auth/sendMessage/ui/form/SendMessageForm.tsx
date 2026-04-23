import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { schemaMessage, type MessageFormData } from './lib/validate';
import SendIcon from '@mui/icons-material/Send';
import ChatWS from '@/shared/lib/ws/chat/chatWS';

const SendMessageForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MessageFormData>({
    resolver: zodResolver(schemaMessage),
  });

  const messageValue = watch('message');

  const sendMessageSubmit = (data: MessageFormData) => {
    const messagePacket = {
      type: 'SEND',
      payload: { message: data.message },
    };
    ChatWS.wsRef?.current?.send(JSON.stringify(messagePacket));
    reset(
      {
        message: '',
      },
      { keepValues: false },
    );
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(sendMessageSubmit)}>
        <Box>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Message"
              variant="outlined"
              type="text"
              value={messageValue || ''}
              {...register('message')}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: pink[500],
                  },
                  '&:hover fieldset': {
                    borderColor: pink[500],
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: pink[500],
                  },
                },
                '& label.Mui-focused': {
                  color: pink[800],
                },
              }}
              error={!!errors.message}
              helperText={errors.message?.message}
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
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SendMessageForm;
