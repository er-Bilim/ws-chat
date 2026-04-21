import { Navigate } from 'react-router-dom';
import type { FC, PropsWithChildren } from 'react';

interface ProtectedRouterProps extends PropsWithChildren {
  isAuth: boolean;
  isNew: boolean;
}

const ProtectedRouter: FC<ProtectedRouterProps> = ({
  children,
  isAuth,
  isNew,
}) => {
  if (!isAuth && isNew) {
    return <Navigate to="/signup" />;
  }

  if (!isAuth && !isNew) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouter;
