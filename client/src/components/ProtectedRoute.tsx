import useAuthStore from '@store/authStore';
import { Navigate, Outlet } from 'react-router-dom';
import PageLayout from './PageLayout';

export default function ProtectedRoute() {
  const isAuth = useAuthStore((state) => state.isAuth);

  // When user refreshes page, render nothing if it's initial value
  if (isAuth === null) {
    return null;
  }

  // Once refresh is resolved, either render children or force navigate to home
  // depending on auth state
  return isAuth ? (
    <>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  ) : (
    <Navigate to="/" replace />
  );
}
