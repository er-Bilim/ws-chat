import { toast } from 'react-toastify';
import type { IRegister, IUser } from '@entities/user/model/types';
import { useUserActions } from '@entities/user/model/userStore';
import axiosApi from '@shared/api/axiosApi';

const useRegister = () => {
  const { setUser, setLoading } = useUserActions();

  return async (dataRegister: IRegister) => {
    try {
      setLoading(true);
      const formData = new FormData();

      const keys = Object.keys(dataRegister) as (keyof IRegister)[];

      keys.forEach((key) => {
        const value = dataRegister[key];

        if (value) {
          formData.append(key, value);
        }
      });

      const { data } = await axiosApi.post<{ user: IUser; message: string }>(
        `/users`,
        formData,
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
