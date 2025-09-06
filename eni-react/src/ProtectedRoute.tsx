import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { FullScreenLoader } from '@/components'
import { useGetMeQuery } from '@/store/api'

export const ProtectedRoute = () => {
	const { isSuccess, isFetching } = useGetMeQuery()
	const location = useLocation()

	if (isFetching) return <FullScreenLoader />

	return isSuccess ? (
		<Outlet />
	) : (
		<Navigate replace state={{ from: location.pathname }} to='/login' />
	)
}
