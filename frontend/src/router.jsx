import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';

const isLogin = window.localStorage.getItem('isLogin');

const router = createBrowserRouter([
  {
    path: '/',
    element: isLogin ? (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ) : (
      <div>
        <Outlet />
      </div>
    ),
    errorElement: <div>NotFound</div>,
    children: [
      {
        index: true,
        path: '/',
        element: isLogin ? <div>DashboardPage</div> : <div>OnboardingPage</div>,
      },
      {
        path: '/:historyId',
        element: <div>HistoryPage</div>,
      },
      {
        path: '/auth',
        element: <div>AuthPage</div>,
      },
    ],
  },
]);

export default router;
