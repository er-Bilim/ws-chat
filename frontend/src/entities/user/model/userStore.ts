import type { IUser } from './types';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { IGlobalError } from '../../../shared/types/error.types';

interface IUserState {
  user: IUser | null;
  isAuth: boolean;
  loading: boolean;
  error: IGlobalError | null;
  actions: {
    setUser: (user: IUser) => void;
    clearUser: () => void;
    setError: (error: IGlobalError | null) => void;
    setLoading: (loading: boolean) => void;
  };
}

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuth: false,
        loading: false,
        error: null,
        actions: {
          setUser(user) {
            set({
              user,
              isAuth: true,
            });
          },

          clearUser() {
            set({
              user: null,
              isAuth: false,
            });
          },

          setError(error) {
            set({
              error,
            });
          },

          setLoading(loading) {
            set({
              loading,
            });
          },
        },
      }),
      {
        name: 'user-storage',

        partialize: (state) => ({
          user: state.user
            ? {
                _id: state.user._id,
                avatar: state.user.avatar,
                username: state.user.username,
                display_name: state.user.display_name,
              }
            : null,
          isAuth: state.isAuth,
        }),

        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: 'userStore',
      enabled: true,
    },
  ),
);

export const useUserActions = () => useUserStore((state) => state.actions);
