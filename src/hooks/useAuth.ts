import { useGetMeQuery } from '@/api'

export const useAuth = () => {
	const {
		data: me,
		isLoading,
		isError
	} = useGetMeQuery()
	const isAuthenticated = Boolean(me) && !isError

	return { me, isLoading, isAuthenticated }
}
