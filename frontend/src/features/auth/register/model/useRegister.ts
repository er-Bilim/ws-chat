import { toast } from 'react-toastify';
import type { IRegister, IUser } from '@entities/user/model/types';
import { useUserActions } from '@entities/user/model/userStore';
import axiosApi from '@shared/api/axiosApi';

const useRegister = () => {
  const { setUser, setLoading } = useUserActions();

  return async (dataRegister: IRegister) => {
    try {
      setLoading(true);
      const { data } = await axiosApi.post<{ user: IUser; message: string }>(
        `/users`,
        dataRegister,
      );
      toast.success(data.message);
      setUser(data.user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
};

export default useRegister;
