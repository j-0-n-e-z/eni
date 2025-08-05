import { useGetMeQuery } from '@/api'

export const useAuth = () => {
	const {
		data: user,
		isLoading,
		isError
	} = useGetMeQuery(undefined, { skip: !localStorage.getItem('accessToken') })
	const isAuthenticated = Boolean(user) && !isError

	return { user, isLoading, isAuthenticated }
}
