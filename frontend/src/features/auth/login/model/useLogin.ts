import type { ILogin, IUserAuth } from '@entities/user/model/types';
import { useUserActions } from '@entities/user/model/userStore';
import axiosApi from '@shared/api/axiosApi';
import { toast } from 'react-toastify';
import { parseApiError } from '@shared/api/error/normalizeResError';
import type { IGlobalError } from '@shared/types/error.types';

const useLogin = () => {
  const { setUser, setLoading, setError } = useUserActions();

  return async (dataLogin: ILogin) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosApi.post<IUserAuth>(
        '/users/sessions',
        dataLogin,
      );
      toast.success(data.message);
      setUser(data.user);
    } catch (error) {
      setError(parseApiError(error as IGlobalError));
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
};

export default useLogin;
