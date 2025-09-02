import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export const ProtectedRoute = () => {
  const { user } = useAuth(); // from AuthContext

  if (user.isLoggedIn == false) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};
