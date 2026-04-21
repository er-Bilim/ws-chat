import axios from 'axios';
import { API_URL, HTTP_PROTOCOL } from '../constants/constants';
import useLogout from '@/features/auth/logout/model/useLogout';

const axiosApi = axios.create({
  baseURL: `${HTTP_PROTOCOL}${API_URL}/api`,
});

axiosApi.defaults.withCredentials = true;

const logoutAndRedirect = async () => {
  try {
    await axios.delete(`${HTTP_PROTOCOL}${axiosApi}/api/users/sessions`, {
      withCredentials: true,
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);
  }

  try {
    const clearUser = useLogout();

    clearUser();
  } catch (error) {
    console.error(error);
  }

  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== 'api/users/token'
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${HTTP_PROTOCOL}${API_URL}/api/users/token`,
          {},
          { withCredentials: true },
        );

        return axiosApi(originalRequest);
      } catch (refreshToken) {
        await logoutAndRedirect();
        return Promise.reject(refreshToken);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApi;
