import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import BaseLayout from './layouts/BaseLayout';
import DashBoardPage from './pages/DashboardPage';
import SignPage from './pages/SignPage';
import OnboardingPage from './pages/OnboardingPage';

// const isLogin = window.localStorage.getItem('isLogin');
const isLogin = false;

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
        element: isLogin ? <DashBoardPage /> : <OnboardingPage />,
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
