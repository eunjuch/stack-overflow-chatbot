import { createBrowserRouter, Outlet } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    errorElement: <div>NotFound</div>,
    children: [
      {
        index: true,
        path: '/',
        element: <div>Home</div>,
      },
      {
        path: '/auth',
        element: <div>Auth</div>,
      },
    ],
  },
]);

export default router;
