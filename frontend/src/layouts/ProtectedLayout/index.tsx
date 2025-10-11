import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthData } from '@/hooks'
import { FullScreenLoader } from '@/ui'

export const ProtectedLayout = () => {
	const { isMeSuccess, isMeFetching } = useAuthData()
	const location = useLocation()

	if (isMeFetching) return <FullScreenLoader />

	return isMeSuccess ? (
		<Outlet />
	) : (
		<Navigate replace state={{ from: location.pathname }} to='/login' />
	)
}
