import { useUserActions } from '@entities/user/model/userStore';

const useLogout = () => {
  const { clearUser, setLoading } = useUserActions();

  return async () => {
    try {
      setLoading(true);
      clearUser();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
};

export default useLogout;
