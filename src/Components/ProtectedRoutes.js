import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../features/auth/authSlice';

const ProtectedRoutes = () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  return token && token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
