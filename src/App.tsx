import './App.css'
import { rootRoute } from './routes/__root';
import { dashboardRoute } from './routes/dashboard';
import { loginRoute } from './routes/login';
import { createRouter, RouterProvider } from '@tanstack/react-router';

const routeTree = rootRoute.addChildren([loginRoute, dashboardRoute])
const router = createRouter({ routeTree })

export default function App() {
  return <RouterProvider router={router} />
}
