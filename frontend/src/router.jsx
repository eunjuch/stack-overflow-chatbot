import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import BaseLayout from './layouts/BaseLayout';
import SignPage from './pages/SignPage';

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
        <BaseLayout>
          <Outlet />
        </BaseLayout>
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
        element: <SignPage />,
      },
    ],
  },
]);

export default router;
