import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/hooks'

export const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return <div>ЗАГРУЗКА</div>

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
