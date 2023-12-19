import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import BaseLayout from './layouts/BaseLayout';
import DashBoardPage from './pages/DashboardPage';
import SignPage from './pages/SignPage';
import HistoryDetailPage from './pages/HistoryDetailPage';
import OnboardingPage from './pages/OnboardingPage';

const isLogin = window.localStorage.getItem('isLogin');
// const isLogin = false;

const router = createBrowserRouter([
  {
    path: '/',
    element: isLogin ? (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ) : (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    errorElement: <div>NotFound</div>,
    children: [
      {
        index: true,
        path: '/',
        element: isLogin ? <DashBoardPage /> : <OnboardingPage />,
      },
      {
        path: '/history/:historyId',
        element: <HistoryDetailPage />,
      },
      {
        path: '/auth',
        element: <SignPage />,
      },
    ],
  },
]);

export default router;
