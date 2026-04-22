import AuthWS from '@/shared/lib/ws/auth/authWS';
import { useUserActions } from '@entities/user/model/userStore';

const useLogout = () => {
  const { clearUser, setLoading } = useUserActions();

  return async () => {
    try {
      setLoading(true);
      AuthWS.closeWS();
      clearUser();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
};

export default useLogout;
