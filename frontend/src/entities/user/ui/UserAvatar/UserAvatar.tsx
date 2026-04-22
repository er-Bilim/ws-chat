import { API_URL, AVATARS_PLACEHOLDER } from '@/shared/constants/constants';
import Box from '@mui/material/Box';
import type { FC } from 'react';

interface IUserAvatar {
  avatarURL: string;
  userID: string;
}

const UserAvatar: FC<IUserAvatar> = ({ avatarURL, userID }) => {
  console.log(userID);

  const indexAvatarPlaceholder: number = Number(userID.at(-2));

  const avatarSrc: string = avatarURL
    ? `${API_URL}/${avatarURL}`
    : (AVATARS_PLACEHOLDER.at(indexAvatarPlaceholder) as string);

  return (
    <>
      <Box
        component={'img'}
        src={avatarSrc}
        alt="avatar"
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
};

export default UserAvatar;
