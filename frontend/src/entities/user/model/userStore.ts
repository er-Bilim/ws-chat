import type { IUser } from './types';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { IGlobalError } from '../../../shared/types/error.types';

interface IUserState {
  user: IUser | null;
  users: IUser[];
  isAuth: boolean;
  loading: boolean;
  error: IGlobalError | null;
  actions: {
    setUser: (user: IUser) => void;
    setUsers: (users: IUser[]) => void;
    addUser: (newUser: IUser) => void;
    clearUser: () => void;
    removeUser: (userID: string) => void;
    setError: (error: IGlobalError | null) => void;
    setLoading: (loading: boolean) => void;
  };
}

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        users: [],
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

          setUsers(users) {
            set({
              users,
            });
          },

          addUser(newUser) {
            set((state) => {
              const isAlreadyInside = state.users.some(
                (user) => user._id === newUser._id,
              );

              if (isAlreadyInside) return state;

              return {
                users: [...state.users, newUser],
              };
            });
          },

          clearUser() {
            set({
              user: null,
              isAuth: false,
            });
          },

          removeUser(userId: string) {
            set((state) => ({
              users: state.users.filter((user) => user._id !== userId),
            }));
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
