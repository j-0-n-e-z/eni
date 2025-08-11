import { Navigate, Outlet } from 'react-router-dom'

import { authApi } from '@/api'

export const ProtectedRoute = () => {
	const { isLoading, isSuccess } = authApi.endpoints.getMe.useQueryState(null)

	if (isLoading) return <div>ЗАГРУЗКА</div>

	return isSuccess ? <Outlet /> : <Navigate to='/login' />
}
