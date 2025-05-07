import { createRootRoute } from '@tanstack/react-router'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const rootRoute = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const currentPath = window.location.pathname

    if (token && currentPath === '/login') {
      navigate({ to: '/dashboard', replace: true })
    }

    if (!token && currentPath !== '/login') {
      navigate({ to: '/login', replace: true })
    }
  }, [])

  return <Outlet />
}
