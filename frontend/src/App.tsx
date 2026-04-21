import MainLayout from '@shared/ui/Layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '@pages/Login/LoginPage';
import RegisterPage from '@pages/Register/RegisterPage';
import ChatPage from '@pages/Chat/ChatPage';
import ProtectedRouter from './app/providers/ProtectedRoute';
import { useUserStore } from '@entities/user/model/userStore';

const App = () => {
  const { isAuth } = useUserStore((state) => state);

  return (
    <>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            index
            element={
              <ProtectedRouter isAuth={isAuth} isNew={true}>
                <ChatPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRouter isAuth={!isAuth} isNew={false}>
                <RegisterPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouter isAuth={!isAuth} isNew={false}>
                <LoginPage />
              </ProtectedRouter>
            }
          />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
