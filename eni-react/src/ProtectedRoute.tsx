import { Navigate, Outlet } from 'react-router-dom'

import { useGetMeQuery } from '@/api'

export const ProtectedRoute = () => {
	const { isLoading, isSuccess } = useGetMeQuery(null)

	if (isLoading) return <div>ЗАГРУЗКА ProtectedRoute</div>

	return isSuccess ? <Outlet /> : <Navigate to='/login' />
}
