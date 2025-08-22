import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useGetMeQuery } from '@/api'

export const ProtectedRoute = () => {
	const { isLoading, isSuccess } = useGetMeQuery()
	const location = useLocation()

	if (isLoading) return <div>ЗАГРУЗКА ProtectedRoute</div>

	return isSuccess ? (
		<Outlet />
	) : (
		<Navigate replace state={{ from: location.pathname }} to='/login' />
	)
}
