import useSession from '@/hooks/useSession';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuth } = useSession();

  // Once refresh is resolved, either render children or force navigate to home
  // depending on auth state
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
